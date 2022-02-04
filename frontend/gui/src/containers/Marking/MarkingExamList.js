import React from "react";
import { ExamListView } from "../ExamView/";


class MarkingExamList extends React.Component {


  render() {
    return (
      <div>
        <ExamListView marking={true} />

      </div>
    );
  }
}

export default (MarkingExamList);
