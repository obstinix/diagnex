const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    const { symptoms, age, gender, medications, allergies, followUp } = body;
    
    if (!symptoms) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Symptoms required' }) };
    }

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: `You are a medical triage assistant. Analyze patient symptoms 
and return ONLY valid JSON — no markdown, no preamble. 

Return this exact structure:
{
  "severity": "low" | "medium" | "high" | "critical",
  "severityLabel": "Monitor at Home" | "See a Doctor Soon" | "Seek Care Today" | "Go to ER Now",
  "severityColor": "#10B981" | "#F59E0B" | "#EF4444" | "#7C3AED",
  "conditions": [
    { "name": string, "likelihood": number, "description": string }
  ],
  "recommendations": [string, string, string],
  "urgencyMessage": string,
  "followUpQuestions": [string, string],
  "disclaimer": "This is not a medical diagnosis. Always consult a licensed physician."
}

Rules:
- Maximum 3 conditions, sorted by likelihood descending
- For medium/high/critical, always include "See a doctor" in recommendations
- urgencyMessage must be actionable and specific
- Never diagnose definitively`,
      messages: [{
        role: 'user',
        content: `Symptoms: ${symptoms}
${age ? `Age: ${age}` : ''}
${gender ? `Gender: ${gender}` : ''}
${medications ? `Current medications: ${medications}` : ''}
${allergies ? `Known allergies: ${allergies}` : ''}
${followUp ? `Follow-up context: ${followUp}` : ''}`
      }]
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    return { statusCode: 200, headers, body: text };
  } catch (err) {
    console.error(err);
    return { 
      statusCode: 500, 
      headers, 
      body: JSON.stringify({ error: 'Analysis failed. Please try again.' }) 
    };
  }
};
