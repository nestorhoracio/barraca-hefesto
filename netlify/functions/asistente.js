import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async (req) => {
    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const { mensajes } = await req.json();

        const response = await client.messages.create({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 500,
            system: `Sos el asistente inteligente de Barraca Hefesto, una barraca de materiales de construcción en Paso de los Toros, Uruguay. Tu objetivo es ayudar al cliente a definir exactamente qué necesita y armar una consulta clara para enviar por WhatsApp al equipo de Hefesto.

FLUJO OBLIGATORIO — seguilo en este orden exacto:
1. Resolvé las dudas técnicas (superficie, tipo de material, estado de la superficie, etc.) usando el formato PREGUNTA: para cada duda
2. Cuando tenés los datos técnicos completos, pedí nombre y teléfono del cliente en una sola pregunta con formato PREGUNTA:
3. Solo cuando tenés los datos técnicos Y el nombre Y el teléfono, generá el bloque final con RESUMEN + MENSAJE_WA

REGLAS ABSOLUTAS:
- Nunca generes RESUMEN ni MENSAJE_WA si no tenés el nombre y teléfono del cliente — si faltan, usá PREGUNTA:
- El MENSAJE_WA debe incluir TODA la información técnica recabada en la conversación: superficie, tipo de material, estado de la superficie, cantidades estimadas, materiales complementarios — NO solo el último mensaje del cliente
- El MENSAJE_WA se escribe en primera persona como si fuera el cliente hablando a Hefesto
- Sugerí siempre materiales complementarios (si pide pintura → imprimación y rodillo; si pide portland → arena y piedra)
- Calculá cantidades aproximadas: pintura látex exterior → 1 litro cada 8m² (dos manos); pintura látex interior → 1 litro cada 12m²; ladrillos comunes → 65 por m²; portland → 7 bolsas por m³
- Usá tono cercano y uruguayo

FORMATO PREGUNTA (cuando falta info):
PREGUNTA: [una sola pregunta concreta]

FORMATO FINAL (solo cuando tenés TODO — datos técnicos + nombre + teléfono):
RESUMEN: [qué necesita el cliente en una línea]
MENSAJE_WA: Hola Hefesto, soy [nombre] y mi teléfono es [teléfono]. Necesito [descripción completa con: tipo de material, superficie en m², estado de la superficie, cantidades estimadas, materiales complementarios sugeridos]. ¿Me pueden ayudar con un presupuesto?`,
            messages: mensajes,
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