import { HfInference } from '@huggingface/inference';

const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);

// Retry function with exponential backoff
const retryWithBackoff = async (fn: () => Promise<any>, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      if (i === maxRetries - 1) throw error;
      const waitTime = Math.min(1000 * Math.pow(2, i), 10000);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
};

export const generateResponse = async (input: string) => {
  try {
    console.log('Generating response for input:', input);
    
    // Using a more stable and reliable model
    const response = await retryWithBackoff(() => 
      hf.textGeneration({
        model: 'gpt2', // Switched to the main GPT-2 model which is more stable
        inputs: input, // Input is already limited to 250 characters in the Chatbot component
        parameters: {
          max_new_tokens: 100,
          temperature: 0.7,
          top_p: 0.95,
          repetition_penalty: 1.2,
          do_sample: true
        }
      })
    );
    
    console.log('Response received:', response);
    return response.generated_text;
  } catch (error: any) {
    console.error('Detailed error in generateResponse:', error);
    
    // Enhanced error handling with more specific messages
    if (!import.meta.env.VITE_HUGGINGFACE_API_KEY) {
      return 'Configuration error: Hugging Face API key is missing. Please check your environment variables.';
    }
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return 'Network error: Unable to reach the AI service. Please check your internet connection.';
    }
    
    if (error.status === 401) {
      return 'Authentication error: Invalid API key. Please contact support to verify your credentials.';
    }
    
    if (error.status === 404) {
      return 'Service error: The AI model is currently unavailable. We are working on resolving this issue.';
    }
    
    if (error.status === 429) {
      return 'Service busy: Too many requests. Please try again in a few moments.';
    }
    
    if (error.status >= 500) {
      return 'Service error: The AI service is experiencing technical difficulties. Please try again later.';
    }
    
    return 'I apologize, but I was unable to process your message. Please try again with different phrasing.';
  }
};

export const analyzeCV = async (cvText: string) => {
  try {
    const response = await retryWithBackoff(() =>
      hf.textClassification({
        model: 'facebook/bart-large-mnli',
        inputs: cvText,
        parameters: {
          candidate_labels: [
            'technical skills',
            'soft skills',
            'work experience',
            'education',
            'achievements'
          ]
        }
      })
    );
    
    return response;
  } catch (error) {
    console.error('Error analyzing CV:', error);
    return null;
  }
};

export const analyzeSentiment = async (text: string) => {
  try {
    const response = await retryWithBackoff(() =>
      hf.textClassification({
        model: 'distilbert-base-uncased-finetuned-sst-2-english',
        inputs: text
      })
    );
    
    return response;
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    return null;
  }
};