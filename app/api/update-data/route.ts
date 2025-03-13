import { NextResponse } from "next/server"
import { updateMarketData } from "@/lib/google-sheets"

// Estas directivas son cruciales para evitar el almacenamiento en caché
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
    console.log(`[${new Date().toLocaleTimeString()}] API Update: Iniciando actualización de datos...`)

    // Obtener datos actualizados
    const data = await updateMarketData()

    console.log(`[${new Date().toLocaleTimeString()}] API Update: Se obtuvieron ${data.length} registros`)

    // Configurar encabezados para evitar el almacenamiento en caché
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error(`[${new Date().toLocaleTimeString()}] Error en la API Update:`, error)
    return NextResponse.json({ error: "Error al actualizar los datos del mercado" }, { status: 500 })
  }
}

