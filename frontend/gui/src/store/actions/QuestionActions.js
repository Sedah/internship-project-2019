import axios from "axios";
import * as actionTypes from "./actionTypes";
import { message } from "antd";

const questionStart = () => {
  return {
    type: actionTypes.QUESTION_START
  };
};

const questionFail = error => ({
  type: actionTypes.QUESTION_FAIL,
  error: error
});

const questionSuccess = question => {
  return {
    question: question,
    type: actionTypes.QUESTION_SUCCESS
  };
};

export const questionFetch = questionId => dispatch => {
  dispatch(questionStart());
  axios
    .get(process.env.REACT_APP_API_URL + `/api/exam_question/${questionId}`)
    .then(res => {
      dispatch({
        type: actionTypes.QUESTION_GET,
        data: res.data
      });
      const question = res.data;
      dispatch(questionSuccess(question));
    })
    .catch(_ => {
      console.log(_);
      dispatch(questionFail());
    });
};

export const multipleChoicePost = (
  values,
  choiceKeys,
  examId,
  choice,
  imagelist
) => dispatch => {
  dispatch(questionStart());
  console.log(values);
  console.log(examId);
  let data = null;
  axios
    .post(process.env.REACT_APP_API_URL + `/api/exam_question/`, {
      exam: examId,
      question: values.question,
      question_type: values.type,
      choice: choiceKeys.map(key => choice[key])
    })
    .then(res => {
      const headers = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      const formData = new FormData();
      formData.append("question", res.data.question_id);
      if (imagelist !== undefined) {
        for (let i = 0; i < imagelist.length; i++) {
          if (imagelist[i].originFileObj !== undefined) {
            formData.append(`image${i}`, imagelist[i].originFileObj);
          }
        }
        axios.post(
          `${process.env.REACT_APP_API_URL}/api/image/`,
          formData,
          headers
        );
      }
      console.log(res.data);
      dispatch({
        type: actionTypes.QUESTION_CREATE,
        data: res.data
      });
      const question = res.data;
      dispatch(questionSuccess(question));
      message.success("Question created");
    })
    .catch(err => {
      console.log(err);
      dispatch(questionFail(err));
      message.error("Question create fail");
    });
};

export const multipleChoicePut = (
  values,
  choiceKeys,
  examId,
  choice,
  questionId,
  old_image_list,
  new_image_list
) => dispatch => {
  dispatch(questionStart());
  let data = null;
  console.log(questionId);
  axios
    .put(process.env.REACT_APP_API_URL + `/api/exam_question/${questionId}/`, {
      exam: examId,
      question: values.question,
      // question_type: values.type,
      question_type: "Multiple Choice - One answer",
      choice: choiceKeys.map(key => choice[key])
    })
    .then(res => {
      const headers = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      const formData = new FormData();
      formData.append("question", res.data.question_id);
      // console.log("newimage>>>>>", new_image_list);
      // console.log("oldimage>>>>>", old_image_list);
      if (new_image_list !== undefined) {
        for (let i = 0; i < new_image_list.length; i++) {
          if (new_image_list[i].originFileObj !== undefined) {
            formData.append(`image${i}`, new_image_list[i].originFileObj);
          }
        }
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/api/image/`,
            formData,
            headers
          )
          .then(res => {
            console.log(res);
          });
      }

      old_image_list.map(image => {
        if (image.status === "removed") {
          axios
            .delete(`${process.env.REACT_APP_API_URL}/api/image/${image.uid}`)
            .then(() => {
              console.log("photo deleted");
            })
            .catch(err => console.log(err));
        }
      });
      data = res.data;
    })
    .then(() => {
      console.log(data);
      dispatch({
        type: actionTypes.QUESTION_UPDATE,
        data: data
      });
      dispatch(questionSuccess());
      message.success("Question updated");
    })

    .catch(err => {
      console.log(err);
      dispatch(questionFail(err));
      message.error("Question update fail");
    });
};

export const trueFalsePost = (values, examId, imagelist) => dispatch => {
  dispatch(questionStart());
  axios
    .post(process.env.REACT_APP_API_URL + `/api/exam_question/`, {
      exam: examId,
      question: values.question,
      question_type: "True False",
      choice: values.choice
    })
    .then(res => {
      const headers = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      const formData = new FormData();
      formData.append("question", res.data.question_id);
      if (imagelist !== undefined) {
        for (let i = 0; i < imagelist.length; i++) {
          if (imagelist[i].originFileObj !== undefined) {
            formData.append(`image${i}`, imagelist[i].originFileObj);
          }
        }
        axios.post(
          `${process.env.REACT_APP_API_URL}/api/image/`,
          formData,
          headers
        );
      }
      dispatch({
        type: actionTypes.QUESTION_CREATE,
        data: res.data
      });
      const question = res.data;
      dispatch(questionSuccess(question));
      message.success("Question created");
    })
    .catch(err => {
      console.log(err);
      dispatch(questionFail(err));
      message.error("Question create fail");
    });
};

export const trueFalsePut = (
  values,
  questionId,
  examId,
  old_image_list,
  new_image_list
) => dispatch => {
  dispatch(questionStart());
  let data = null;
  axios
    .put(process.env.REACT_APP_API_URL + `/api/exam_question/${questionId}/`, {
      exam: examId,
      question: values.question,
      question_type: "True False",
      choice: values.choice
    })
    .then(res => {
      const headers = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      const formData = new FormData();
      formData.append("question", res.data.question_id);
      console.log("newimage>>>>>", new_image_list);
      console.log("oldimage>>>>>", old_image_list);
      if (new_image_list !== undefined) {
        for (let i = 0; i < new_image_list.length; i++) {
          if (new_image_list[i].originFileObj !== undefined) {
            formData.append(`image${i}`, new_image_list[i].originFileObj);
          }
        }
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/api/image/`,
            formData,
            headers
          )
          .then(res => {
            console.log(res);
          });
      }

      old_image_list.map(image => {
        if (image.status === "removed") {
          axios
            .delete(`${process.env.REACT_APP_API_URL}/api/image/${image.uid}`)
            .then(() => {
              console.log("photo deleted");
            })
            .catch(err => console.log(err));
        }
      });
      data = res.data;
    })
    .then(() => {
      console.log(data);
      dispatch({
        type: actionTypes.QUESTION_UPDATE,
        data: data
      });
      dispatch(questionSuccess());
      message.success("Question updated");
    })

    .catch(err => {
      console.log(err);
      dispatch(questionFail(err));
      message.error("Question update fail");
    });
};

export const freeTextPost = (
  values,
  choiceKeys,
  examId,
  choice,
  imagelist
) => dispatch => {
  dispatch(questionStart());
  axios
    .post(process.env.REACT_APP_API_URL + `/api/exam_question/`, {
      exam: examId,
      question: values.question,
      question_type: "Free Text",
      choice: choiceKeys.map(key => choice[key])
    })
    .then(res => {
      const headers = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      const formData = new FormData();
      formData.append("question", res.data.question_id);
      if (imagelist !== undefined) {
        for (let i = 0; i < imagelist.length; i++) {
          if (imagelist[i].originFileObj !== undefined) {
            formData.append(`image${i}`, imagelist[i].originFileObj);
          }
        }
        axios.post(
          `${process.env.REACT_APP_API_URL}/api/image/`,
          formData,
          headers
        );
      }
      dispatch({
        type: actionTypes.QUESTION_CREATE,
        data: res.data
      });
      const question = res.data;
      dispatch(questionSuccess(question));
      message.success("Question created");
    })
    .catch(err => {
      console.log(err);
      dispatch(questionFail(err));
      message.error("Question create fail");
    });
};

export const freeTextPut = (
  values,
  choiceKeys,
  examId,
  choice,
  questionId,
  old_image_list,
  new_image_list
) => dispatch => {
  dispatch(questionStart());
  let data = null;
  axios
    .put(process.env.REACT_APP_API_URL + `/api/exam_question/${questionId}/`, {
      exam: examId,
      question: values.question,
      question_type: "Free Text",
      choice: choiceKeys.map(key => choice[key])
    })
    .then(res => {
      const headers = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      const formData = new FormData();
      formData.append("question", res.data.question_id);
      // console.log("newimage>>>>>", new_image_list);
      // console.log("oldimage>>>>>", old_image_list);
      if (new_image_list !== undefined) {
        for (let i = 0; i < new_image_list.length; i++) {
          if (new_image_list[i].originFileObj !== undefined) {
            formData.append(`image${i}`, new_image_list[i].originFileObj);
          }
        }
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/api/image/`,
            formData,
            headers
          )
          .then(res => {
            console.log(res);
          });
      }

      old_image_list.map(image => {
        if (image.status === "removed") {
          axios
            .delete(`${process.env.REACT_APP_API_URL}/api/image/${image.uid}`)
            .then(() => {
              console.log("photo deleted");
            })
            .catch(err => console.log(err));
        }
      });
      data = res.data;
    })
    .then(() => {
      console.log(data);
      dispatch({
        type: actionTypes.QUESTION_UPDATE,
        data: data
      });
      dispatch(questionSuccess());
      message.success("Question updated");
    })

    .catch(err => {
      console.log(err);
      dispatch(questionFail(err));
      message.error("Question update fail");
    });
};

export const essayPost = (values, examId, imagelist) => dispatch => {
  dispatch(questionStart());
  axios
    .post(process.env.REACT_APP_API_URL + `/api/exam_question/`, {
      exam: examId,
      question: values.question,
      question_type: "Essay",
      choice: []
    })
    .then(res => {
      const headers = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      const formData = new FormData();
      formData.append("question", res.data.question_id);
      if (imagelist !== undefined) {
        for (let i = 0; i < imagelist.length; i++) {
          if (imagelist[i].originFileObj !== undefined) {
            formData.append(`image${i}`, imagelist[i].originFileObj);
          }
        }
        axios.post(
          `${process.env.REACT_APP_API_URL}/api/image/`,
          formData,
          headers
        );
      }
      dispatch({
        type: actionTypes.QUESTION_CREATE,
        data: res.data
      });
      const question = res.data;
      dispatch(questionSuccess(question));
      message.success("Question created");
    })
    .catch(err => {
      console.log(err);
      dispatch(questionFail(err));
      message.error("Question create fail");
    });
};

export const essayPut = (
  values,
  questionId,
  exam,
  old_image_list,
  new_image_list
) => dispatch => {
  dispatch(questionStart());
  let data = null;
  axios
    .put(process.env.REACT_APP_API_URL + `/api/exam_question/${questionId}/`, {
      exam: exam,
      question: values.question,
      question_type: "Essay",
      choice: []
    })
    .then(res => {
      const headers = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      const formData = new FormData();
      formData.append("question", res.data.question_id);
      // console.log("newimage>>>>>", new_image_list);
      // console.log("oldimage>>>>>", old_image_list);
      if (new_image_list !== undefined) {
        for (let i = 0; i < new_image_list.length; i++) {
          if (new_image_list[i].originFileObj !== undefined) {
            formData.append(`image${i}`, new_image_list[i].originFileObj);
          }
        }
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/api/image/`,
            formData,
            headers
          )
          .then(res => {
            console.log(res);
          });
      }

      old_image_list.map(image => {
        if (image.status === "removed") {
          axios
            .delete(`${process.env.REACT_APP_API_URL}/api/image/${image.uid}`)
            .then(() => {
              console.log("photo deleted");
            })
            .catch(err => console.log(err));
        }
      });
      console.log(new_image_list);
      console.log(old_image_list);
      data = res.data;
    })
    .then(() => {
      console.log(data);
      dispatch({
        type: actionTypes.QUESTION_UPDATE,
        data: data
      });
      dispatch(questionSuccess());
      message.success("Question updated");
    })

    .catch(err => {
      console.log(err);
      dispatch(questionFail(err));
      message.error("Question update fail");
    });
};
