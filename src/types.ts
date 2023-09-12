export interface UserDocument {
  name: string;
  status: string;
  summary: string;
  hash_name: string;
  create_time: number;
}

export interface Conversation {
  conversation_id: string;
  create_time: number;
  question_answers: QuestionAnswer[];
}

export interface QuestionAnswer {
  create_time: number;
  question: string;
  answer: {
    result: string;
    source_documents: [SourceDocument]
  }
}

export interface SourceDocument {
  metadata: {
    source: string;
  },
  page_content: string;
}

export interface UserProfile {
  name: string;
  description: string;
  profile_id: string;
  create_time: number;
  documents: UserDocument[];
}