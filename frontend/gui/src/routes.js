import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { SubjectListView } from "./containers/SubjectView";
import { ExamListView, AssignedExamListView, ExamDescription, LeaderBoard } from "./containers/ExamView";
import { SelectionType } from "./components/QuestionForm";
import { ShowQuestionList, EditQuestionFormView } from "./containers/EditQuestionView";
import { Exam_DetailListView } from "./containers/User_Attempt";
import { ResultView, AttemptView } from "./containers/ResultView";
import { AttemptHistoryView } from "./containers/AttemptHistoryView";
import { ManageExam, ManageSubject } from "./containers/ManageSubjectExam";
import { ManageUser } from "./containers/User_Management"
import { ProfileView } from "./containers/Profile";
import { MarkingExamList, MarkingAnswer } from "./containers/Marking";
import CustomLayout from "./containers/Layout";
import SelectTabs from "./containers/SelectTabs";
import AccessControl from "./utils/AccessControl"
import { updateObject } from "./utils/utillity"
import MainForm from "./containers/AssignExam/MainForm";
import AssignedView from "./containers/AssignExam/AssignedView";
import { Result } from 'antd';




const NoMatchPage = () => {
  return (
    <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
  />
  );
};

const ForbiddenPage = () => {
  return (
    <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
  />
  );
};
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('token') !== null
      ? 
      <AccessControl
      user={rest.myprops.role || undefined}
      allowedPermissions={rest.allowedPermissions}
      renderNoAccess={() => (<ForbiddenPage/>)}
    >
      <CustomLayout {...updateObject(props, rest.myprops)}><Component {...props} /></CustomLayout>
    </AccessControl>
      : <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }} />
  )} />
)
export const BaseRouter = (props) => (

    <Switch>
      <Route exact path="/" component={SelectTabs} myprops={props}/>
      <PrivateRoute exact path="/subject/" component={SubjectListView} myprops={props}/>
      <PrivateRoute exact path="/topic/:topicId/" component={ExamListView} myprops={props}  />
      <PrivateRoute exact path="/exam/detail/view/:examId/" component={Exam_DetailListView} myprops={props} />
      <PrivateRoute exact path="/exam/detail/:examId/" component={ExamDescription} myprops={props} />
      <PrivateRoute exact path="/exam/view/:examId/" component={ShowQuestionList} myprops={props}/>
      <PrivateRoute exact path="/exam/questionform/:examId/" component={SelectionType} myprops={props}/>
      <PrivateRoute exact path="/exam/edit/:questionId/" component={EditQuestionFormView} allowedPermissions={["crud:all"]} myprops={props}/>
      <PrivateRoute exact path="/marking/exam/admin" component={MarkingExamList} allowedPermissions={["crud:all"]} myprops={props}/>
      <PrivateRoute exact path="/marking/exam/instructor" component={MarkingExamList} allowedPermissions={["crud:all"]} myprops={props}/>
      <PrivateRoute exact path="/marking/exam/:examId/" component={MarkingAnswer} allowedPermissions={["crud:all"]} myprops={props}/>
      <PrivateRoute exact path="/resultview/:attemptId/" component={ResultView} myprops={props}/>
      <PrivateRoute exact path="/history/attempt/:userId/" component={AttemptHistoryView} myprops={props}/>
      <PrivateRoute exact path="/manage/subject/:userId/" component={ManageSubject} allowedPermissions={["crud:all"]} myprops={props}/>
      <PrivateRoute exact path="/manage/exam/:userId/" component={ManageExam} allowedPermissions={["crud:all"]} myprops={props}/>
      <PrivateRoute exact path="/history/result/:attemptId/" component={AttemptView} myprops={props}/>
      <PrivateRoute exact path="/profile/:userId/" component={ProfileView} myprops={props}/>
      <PrivateRoute exact path="/assigned/" component={AssignedView} allowedPermissions={["assign:all"]} myprops={props}/>
      <PrivateRoute exact path="/assigned_exam/:userId/" component={AssignedExamListView} myprops={props}/>
      <PrivateRoute exact path="/assign/" component={MainForm} allowedPermissions={["assign:all"]} myprops={props}/>
      <PrivateRoute exact path="/user/" component={ManageUser} allowedPermissions={["user:all"]} myprops={props} />
      <PrivateRoute exact path="/forbidden/" component={ForbiddenPage} myprops={props}/>
      <Route component={NoMatchPage} />
    </Switch>
    

);


