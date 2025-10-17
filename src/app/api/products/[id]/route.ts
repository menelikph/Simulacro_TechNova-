import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

// PUT - Actualizar producto por ID
export async function PUT(
  request: Request,
  //{ params }: { params: { id: string } }
  context: { params: Promise<{ id: string }> } // 👈 se declara como Promise
) {
  try {
    const { id } = await context.params; // 👈 se espera el resultado
    await dbConnect();
    const body = await request.json();

    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });

    if (!updatedProduct) {
      return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return NextResponse.json({ message: "Error al actualizar producto" }, { status: 500 });
  }
}

// DELETE - Eliminar producto por ID
export async function DELETE(
  request: Request,
  //{ params }: { params: { id: string } }
  context: { params: Promise<{ id: string }> } // 👈 también aquí
) {
  try {
    const { id } = await context.params; // 👈 se espera antes de usar
    await dbConnect();

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return NextResponse.json({ message: "Error al eliminar producto" }, { status: 500 });
  }
}
