import React, { useEffect } from "react"
import { Container, Row, Input, Col, Label, Button, Table } from "reactstrap"
import { useParams, useNavigate } from 'react-router-dom';
import { API_ENDPOINT } from "../api_endpoint";




const Voting = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [topicName, setTopicName] = React.useState("")
  const [options, setOptions] = React.useState([]);
  const [castSelectedOption, setCastSelectedOption] = React.useState('');
  if (localStorage.getItem("votingId") === id) navigate('/thankyou');




  const getVotingCountForSpecificId = () => {
    return fetch(
      `${API_ENDPOINT}/Create-vote-topic/${id}`
    )
      .then((res) => res.json())
  }

  useEffect(() => {
    getVotingCountForSpecificId().then((res) => {
      setTopicName(res?.voteTopic)
      const opts = res?.voteOptions?.split("/")
      setOptions(opts)
    });
  }, []);



  const voting = () => {

    getVotingCountForSpecificId().then((res) => {
      if (res) {
        const votingObj = JSON.parse(res.voteOptionsCount);
        votingObj[castSelectedOption] = votingObj[castSelectedOption] + 1;

        const body = {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            voteOptionsCount: JSON.stringify(votingObj),
          }),
        };
        fetch(
          `${API_ENDPOINT}/Create-vote-topic/${id}`,
          body
        )
          .then((res) => res.json())
          .then((resData) => {
            localStorage.setItem("votingId", id);
            navigate('/thankyou');



          });
      }
    })
  }


  const handleVoteOptionChange = (event) => {
    const {
      target: { value },
    } = event;
    setCastSelectedOption(value);
  };


  return (


    <Container>
      <div>
        <h3>{topicName || "Loading....."}</h3>
      </div>
      {options.length &&
        options.map((opt) => (
          <div>
            <Input
              type="radio"
              id={`${opt}-id`}
              name="castOptions"
              value={opt}
              onChange={handleVoteOptionChange}
            />
            <Label className="ms-2" htmlFor={`${opt}-id`}>{opt} </Label>
          </div>
        ))}
      <div>
        <Row>
          <Col>
            <Button onClick={voting} color="primary">  Submit  </Button>
          </Col>
        </Row>
      </div>




    </Container>)
}

export default Voting;