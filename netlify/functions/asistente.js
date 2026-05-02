import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async (req) => {
    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const { mensaje } = await req.json();

        const response = await client.messages.create({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 500,
            system: `Sos el asistente de Barraca Hefesto, una barraca de materiales de construcción en Paso de los Toros, Uruguay. 
Tu tarea es analizar lo que necesita el cliente y armar un mensaje claro y estructurado para que el equipo de Hefesto pueda responderle rápido por WhatsApp.

Respondé SIEMPRE en este formato exacto:
RESUMEN: [qué necesita el cliente en una línea]
DETALLE: [descripción completa de lo que pidió]
MENSAJE_WA: [mensaje listo para enviar por WhatsApp, en primera persona como si fuera el cliente]

Sé breve y directo. No inventes precios ni disponibilidad.`,
            messages: [
                { role: 'user', content: mensaje }
            ],
        });

        const texto = response.content[0].type === 'text' ? response.content[0].text : '';

        return new Response(JSON.stringify({ respuesta: texto }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error al procesar la consulta' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};

export const config = {
    path: '/api/asistente',
};