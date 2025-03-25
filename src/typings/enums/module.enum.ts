export enum ChatRole {
  AI = 'assistant',
  User = 'user'
}

export enum ChatMessageType {
  InterviewQuestion = 'interview_question',
  ValueCreationModelQuestion = 'value_creation_model_question',
  ValueCreatorsListQuestion = 'value_creators_list_question',
  NotApplicableQuestion = 'not_applicable_question',
  UserAnswer = 'user_answer'
}

export enum TopicStatus {
  New = 'new',
  ActiveDiscussion = 'active',
  Completed = 'completed',
}
