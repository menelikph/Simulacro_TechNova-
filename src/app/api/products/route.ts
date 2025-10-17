import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

// GET - get all products
export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find(); // obtiene todos los productos
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return NextResponse.json({ message: "Error al obtener productos" }, { status: 500 });
  }
}

// POST - Crear un nuevo producto
export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json(); // obtiene los datos enviados

    // Crea un nuevo producto con los datos del cuerpo
    const newProduct = await Product.create(body);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error al crear producto:", error);
    return NextResponse.json({ message: "Error al crear producto" }, { status: 500 });
  }
}
