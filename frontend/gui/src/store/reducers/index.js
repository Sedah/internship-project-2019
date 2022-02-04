import { combineReducers } from "redux";
import SubjectReducer from "./SubjectReducer";
import ExamReducer from "./ExamReducer";
import QuestionListReducer from "./QuestionListReducer"
import AttemptReducer from "./AttemptReducer";
import User_AttemptFormReducer from "./User_AttemptFormReducer";
import AuthReducer from "./AuthReducer";
import HistoryReducer from "./HistoryReducer";
import UserReducer from "./UserReducer";
import QuestionReducer from "./QuestionReducer";
import ProfileReducer from "./ProfileReducer";
import AssignFormReducer from "./AssignFormReducer";
import AssignReducer from "./AssignReducer";
import AssignListReducer from "./AssignListReducer";
import TopicReducer from "./TopicReducer";
import MarkingReducer from "./MarkingReducer"
import LeaderBoardReducer from "./LeaderBoardReducer"

const rootReducer = combineReducers({
  subjects: SubjectReducer,
  exams: ExamReducer,
  topics: TopicReducer,
  question: QuestionReducer,
  questionList: QuestionListReducer,
  marking: MarkingReducer,
  user_attempt: AttemptReducer,
  attemptForm: User_AttemptFormReducer,
  auth: AuthReducer,
  historys: HistoryReducer,
  FormReducer: AssignFormReducer,
  assigned_exams: AssignReducer,
  assigned_list: AssignListReducer,
  leaderBoard: LeaderBoardReducer,
  users: UserReducer,
  profile: ProfileReducer
});

export default rootReducer;
