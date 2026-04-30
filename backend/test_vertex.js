import { VertexAI } from '@google-cloud/vertexai';
import path from 'path';

const projectId = 'electiq-494420';
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(process.cwd(), 'credentials/gemini-key.json');

const vertex = new VertexAI({ project: projectId, location: 'us-central1' });
const vertexModel = vertex.getGenerativeModel({
  model: 'gemini-2.5-flash',
});

async function run() {
  try {
    const result = await vertexModel.generateContent('Say hi');
    console.log('SUCCESS:', result.response.candidates[0].content.parts[0].text);
  } catch (err) {
    console.error('ERROR:', err);
  }
}

run();
