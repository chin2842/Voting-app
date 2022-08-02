import React, { useEffect, useState } from "react"
import { Table } from "reactstrap"
import { useParams } from 'react-router-dom';
import { API_ENDPOINT } from "../api_endpoint";




const VotingResult = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [countSelectedOption, setCountSelectedOption] = useState({});

    const getVotingCountForSpecificId = () => {
        return fetch(
            `${API_ENDPOINT}/Create-vote-topic/${id}`
        )
            .then((res) => res.json())
    }



    const fetchData = () => {
        getVotingCountForSpecificId().then((res) => {
            setData(res);
            setCountSelectedOption(JSON.parse(res.voteOptionsCount));
        })
    }

    

    useEffect(() => {

        fetchData();

    },[] )



    return (
        <>
            <h2 style={{backgroundColor: "DodgerBlue",padding: "10px",border: '1px solid rgba(0, 0, 0, 0.05)'}}>{data?.voteTopic}</h2>
            {Object.keys(countSelectedOption).length ?

                <Table><tbody>
                    {Object.keys(countSelectedOption).map((key) => (
                        <tr scope="row">
                            <th>{key}</th>
                            <td>{countSelectedOption[key]}</td>
                        </tr>
                    ))}
                </tbody>
                </Table>
                :
                <h3 style={{backgroundColor: "DodgerBlue",padding: "10px",border: '1px solid rgba(0, 0, 0, 0.05)'}}>Loading....</h3>
            }
        </>
    )
}

export default VotingResult;

