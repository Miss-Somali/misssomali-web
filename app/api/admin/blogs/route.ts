import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdmin, logAdminAction } from "@/lib/admin-auth";
import { ActionType, TargetType } from "@prisma/client";

async function generateUniqueSlug(title: string, currentBlogId?: string): Promise<string> {
  let baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove non-word chars
    .replace(/[\s_-]+/g, "-") // replace spaces/hyphens with single hyphen
    .replace(/^-+|-+$/g, "");  // trim hyphens

  if (!baseSlug) {
    baseSlug = "post";
  }

  let slug = baseSlug;
  let counter = 1;
  while (true) {
    const existing = await prisma.blog.findFirst({
      where: {
        slug,
        id: currentBlogId ? { not: currentBlogId } : undefined,
      },
    });
    if (!existing) {
      break;
    }
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
}

function generateExcerpt(htmlContent: string): string {
  if (!htmlContent) return "";
  // Strip HTML tags using regex
  const plainText = htmlContent
    .replace(/<[^>]*>/g, " ")      // Replace HTML tags with space
    .replace(/\s+/g, " ")          // Collapse multiple spaces
    .trim();
  
  if (plainText.length <= 180) {
    return plainText;
  }
  return plainText.substring(0, 177) + "...";
}

export async function GET(request: NextRequest) {
  try {
    const { error, status } = await verifyAdmin();
    if (error) {
      return NextResponse.json({ error }, { status });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const blog = await prisma.blog.findUnique({
        where: { id },
      });
      if (!blog) {
        return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
      }
      return NextResponse.json(blog);
    }

    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Admin Blogs GET API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { error, status, session } = await verifyAdmin();
    if (error || !session) {
      return NextResponse.json({ error }, { status: status || 401 });
    }

    const { title, content, coverImage, author, status: postStatus } = await request.json();

    if (!title || !content || !coverImage || !author) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const generatedSlug = await generateUniqueSlug(title);
    const generatedExcerpt = generateExcerpt(content);

    const newBlog = await prisma.blog.create({
      data: {
        title,
        slug: generatedSlug,
        excerpt: generatedExcerpt,
        content,
        coverImage,
        author,
        status: postStatus || "draft",
        publishedAt: postStatus === "published" ? new Date() : null,
      },
    });

    // Log action
    await logAdminAction(
      session.user.id,
      ActionType.publish,
      TargetType.media,
      newBlog.id,
      { title, slug: generatedSlug }
    );

    return NextResponse.json(newBlog);
  } catch (error) {
    console.error("Admin Blogs POST API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { error, status, session } = await verifyAdmin();
    if (error || !session) {
      return NextResponse.json({ error }, { status: status || 401 });
    }

    const { id, title, content, coverImage, author, status: postStatus } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Blog ID required" }, { status: 400 });
    }

    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    let updatedSlug = existingBlog.slug;
    if (title !== undefined && title !== existingBlog.title) {
      updatedSlug = await generateUniqueSlug(title, id);
    }

    let updatedExcerpt = existingBlog.excerpt;
    if (content !== undefined) {
      updatedExcerpt = generateExcerpt(content);
    }

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existingBlog.title,
        slug: updatedSlug,
        excerpt: updatedExcerpt,
        content: content !== undefined ? content : existingBlog.content,
        coverImage: coverImage !== undefined ? coverImage : existingBlog.coverImage,
        author: author !== undefined ? author : existingBlog.author,
        status: postStatus !== undefined ? postStatus : existingBlog.status,
        publishedAt: postStatus !== undefined 
          ? (postStatus === "published" && !existingBlog.publishedAt ? new Date() : (postStatus === "draft" ? null : existingBlog.publishedAt))
          : existingBlog.publishedAt,
      },
    });

    // Log action
    await logAdminAction(
      session.user.id,
      ActionType.update,
      TargetType.media,
      id,
      { title: updatedBlog.title, slug: updatedBlog.slug }
    );

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Admin Blogs PUT API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { error, status, session } = await verifyAdmin();
    if (error || !session) {
      return NextResponse.json({ error }, { status: status || 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Blog ID required" }, { status: 400 });
    }

    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    await prisma.blog.delete({
      where: { id },
    });

    // Log action
    await logAdminAction(
      session.user.id,
      ActionType.delete,
      TargetType.media,
      id,
      { title: existingBlog.title }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin Blogs DELETE API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
