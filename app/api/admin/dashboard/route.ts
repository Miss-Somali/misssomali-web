import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET() {
  try {
    const { error, status } = await verifyAdmin();
    if (error) {
      return NextResponse.json({ error }, { status });
    }

    // Count applications by status
    const [
      totalApplications,
      draftCount,
      submittedCount,
      underReviewCount,
      shortlistedCount,
      approvedCount,
      rejectedCount,
    ] = await prisma.$transaction([
      prisma.contestantApplication.count(),
      prisma.contestantApplication.count({ where: { status: "draft" } }),
      prisma.contestantApplication.count({ where: { status: "submitted" } }),
      prisma.contestantApplication.count({ where: { status: "under_review" } }),
      prisma.contestantApplication.count({ where: { status: "shortlisted" } }),
      prisma.contestantApplication.count({ where: { status: "approved" } }),
      prisma.contestantApplication.count({ where: { status: "rejected" } }),
    ]);

    // Recent submitted applications
    const recentApplications = await prisma.contestantApplication.findMany({
      where: {
        status: { not: "draft" },
      },
      take: 5,
      orderBy: { updatedAt: "desc" },
      include: {
        user: {
          select: {
            fullName: true,
          },
        },
      },
    });

    return NextResponse.json({
      metrics: {
        totalApplications,
        draftCount,
        submittedCount,
        underReviewCount,
        shortlistedCount,
        approvedCount,
        rejectedCount,
      },
      recentApplications,
    });
  } catch (error) {
    console.error("Dashboard stats API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
