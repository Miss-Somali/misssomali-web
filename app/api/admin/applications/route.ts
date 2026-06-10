import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdmin } from "@/lib/admin-auth";
import { Prisma, Status } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { error, status } = await verifyAdmin();
    if (error) {
      return NextResponse.json({ error }, { status });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const statusFilter = searchParams.get("status");
    const country = searchParams.get("country");
    const search = searchParams.get("search");

    const skip = (page - 1) * limit;

    const where: Prisma.ContestantApplicationWhereInput = {};

    if (statusFilter && statusFilter !== "all") {
      where.status = statusFilter as Status;
    } else {
      where.status = { not: "draft" };
    }

    if (country && country !== "all") {
      where.country = country;
    }

    if (search) {
      where.OR = [
        {
          fullName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          user: {
            fullName: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ];
    }

    // Fetch applications, total count, and distinct countries
    const [applications, total, countriesResult] = await prisma.$transaction([
      prisma.contestantApplication.findMany({
        where,
        skip,
        take: limit,
        orderBy: { appliedAt: "desc" },
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              phone: true,
              role: true,
              country: true,
            },
          },
        },
      }),
      prisma.contestantApplication.count({ where }),
      prisma.contestantApplication.findMany({
        where: {
          status: { not: "draft" },
          country: { not: null },
        },
        distinct: ["country"],
        select: {
          country: true,
        },
      }),
    ]);

    const countries = countriesResult
      .map((c) => c.country)
      .filter((c): c is string => Boolean(c));

    return NextResponse.json({
      applications,
      countries,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Applications API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
