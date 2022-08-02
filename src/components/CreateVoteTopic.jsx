import React from "react";
import { Container, Row, Input, Col, Label, Button, Form } from "reactstrap"
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { API_ENDPOINT } from "../api_endpoint";


const CreateVoteTopic = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { ref, ...registerVoteTopic } = register('voteTopic', { minLength: 2 })
    const [voteOptions, setVoteOptions] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const [castSelectedOption, setCastSelectedOption] = React.useState('');
    const [countSelectedOption, setCountSelectedOption] = React.useState({});
    const [value, setValue] = React.useState("");




    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setVoteOptions(value);
    };


    const createVoteTopic = (data, obj) => {

        const body = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                voteTopic: data.voteTopic,
                voteOptions: voteOptions,
                voteOptionsCount: JSON.stringify(obj),
            }),
        };
        fetch(
            `${API_ENDPOINT}/Create-vote-topic`,
            body
        )
            .then((res) => res.json())
            .then((resData) => {
                console.log(resData, '************')
                navigate(`/results/${resData.id}`);
            });


    }

    const onSubmit = (data) => {

        console.log(data)
        const arry = voteOptions.split('/');
        setOptions(arry);
        const obj = {};
        arry.forEach((opt) => {
            obj[opt] = 0;
        });

        createVoteTopic(data, obj)


    };



    const handleVoteOptionChange = (event) => {
        const {
            target: { value },
        } = event;
        setCastSelectedOption(value);
    };

    const handleVoteSubmit = () => {
        const obj = { ...countSelectedOption };
        obj[castSelectedOption] = obj[castSelectedOption] + 1;
        setCountSelectedOption({ ...obj });
        localStorage.setItem('votecount', JSON.stringify(obj));
    };



    return (
        <Container>
            <Row>

                <Col>

                    <h3 style={{backgroundColor: "DodgerBlue",padding: "10px",border: '1px solid rgba(0, 0, 0, 0.05)'}}>Create Topic</h3>

                </Col>

            </Row>
            <Form onSubmit={handleSubmit(onSubmit)}>


                <Row className="mt-4">
                    <Col><Input minlength="5" pattern="[A-Za-z ?]*" maxLength="80" name="voteTopic" defaultValue="" innerRef={ref} {...registerVoteTopic}


                        rows={5} placeholder="Vote Topic" required
                        type="text" />
                    </Col>

                </Row>

                <Row className='mt-4'><Col>
                    <Input
                        type="radio"
                        id="html"
                        name="voteOptions"
                        value="Yes/No"
                        onChange={handleChange}
                        required
                    />
                    <Label className="ms-2" htmlFor="html">Yes/No</Label>
                </Col></Row>


                <Row><Col><Input
                    type="radio"
                    id="css"
                    name="voteOptions"
                    value="Yes/No/Maybe"
                    onChange={handleChange}
                    required
                />
                    <Label className="ms-2" htmlFor="css">Yes/No/Maybe</Label></Col></Row>

                <Row><Col><Input
                    type="radio"
                    id="javascript"
                    name="voteOptions"
                    value="Accept/Reject"
                    onChange={handleChange}
                    required
                />
                    <Label className="ms-2" htmlFor="javascript">Accept/Reject</Label></Col></Row>

                <Row><Col className="text-end">
                    <Button type="submit" color="primary">  Submit  </Button>
                    {/* <Button onClick={handleClick} color="success">  Clear </Button> */}

                </Col></Row>

            </Form>



        </Container>


    );
}


export default CreateVoteTopic;