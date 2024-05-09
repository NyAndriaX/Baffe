import styled from 'styled-components';

export const StyledDiv = styled.div`
  #headerButton {
    margin-bottom: 1%;
    padding-top: 1%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(255, 255, 255);
    padding-left: 1%;
    padding-right: 1%;
    border-radius: 10px;
    box-shadow: 10 8px 12px 0 rgba(0, 0, 0, 0.2);
  }

  #tout {
    margin-bottom: 5px;
    float: left;
  }

  #boxMessage {
    float: right;
    margin-left: 10px;
    margin-top: 0.5%;
  }

  #text1 {
    float: left;
  }

  #btnMessage {
    width: 70%;
  }

  #plus {
    float: right;
    width: 20%;
    padding-top: 2%;
  }

  #text2 {
    float: left;
  }

  .buttonLeft {
    float: left;
  }

  .buttonRight {
    float: right;
    margin-top: -0.3%;
  }

  #SearchMajor {
    float: left;
  }

  #FilterMajor {
    float: right;
  }

  #SortMinor {
    width: 10%;
    float: right;
  }

  .activeButton {
    background-color: #f1f8f5;
  }

  #text1footer {
    margin-bottom: 2%;
    font-weight: bold;
  }

  #item {
    border-radius: 16px;
    padding-left: 4%;
    padding-right: 4%;
    padding-top: 2%;
    padding-bottom: 2%;
  }

  .abandoned {
    background-color: #fae6b5;
  }

  .catchUp {
    background-color: #b6e5b8;
  }

  .voicemailSent {
    background-color: #d3e2ff;
  }

  #pagination {
    margin-top: 3%;
    width: 7%;
  }
`;
