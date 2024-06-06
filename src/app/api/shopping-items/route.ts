import { db } from '@/lib/prisma';
import { ShoppingItem } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
	const items: ShoppingItem[] = await db.shoppingItem.findMany();

	return new NextResponse(JSON.stringify(items), {
		status: 200,
		statusText: 'OK',
	});
}

export async function POST(request: NextRequest) {
	const data: ShoppingItem = await request.json();

	const createdArticle: ShoppingItem = await db.shoppingItem.create({
		data,
	});

	return new NextResponse(JSON.stringify(createdArticle), {
		status: 201,
		statusText: 'Created',
	});
}
