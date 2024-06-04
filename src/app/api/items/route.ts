import { db } from '@/lib/prisma';
import { Items } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
	const items: Items[] = await db.items.findMany();

	return new NextResponse(JSON.stringify(items), {
		status: 200,
		statusText: 'OK',
	});
}

export async function POST(request: NextRequest) {
	const data: Items = await request.json();

	const createdArticle: Items = await db.items.create({
		data,
	});

	return new NextResponse(JSON.stringify(createdArticle), {
		status: 201,
		statusText: 'Created',
	});
}
