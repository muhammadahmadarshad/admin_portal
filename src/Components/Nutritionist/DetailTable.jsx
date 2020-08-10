import React ,{useState} from 'react'
import { Table, Button } from 'reactstrap'
import moment from 'moment'

const DetailTable = (props) => {
    let {data}= props





  
    return ( <div className="mt-5">

    <h1 className="text-center text-primary">{`Nutritionist's Profile`}</h1>
       <Table bordered hover className="mt-3">

            <tbody>
                <tr>
                    <th>Firstname</th>
                    <td>{data.first_name}</td>
                </tr>

                <tr>
                <th>Lastname</th>
                <td>{data.last_name}</td>
                </tr>

                <tr>
                    <th>Gender</th>
                    <td>{data.gender}</td>
                </tr>
                <tr>
                    <th>Diet Plan Fee</th>
                    <td>{data.fee} $</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{data.email}</td>
                </tr>
            </tbody>

       </Table>

        {data.specialities&&<div className="mt-5" >
            <h1 className="text-center">Specialization</h1>

            <Table striped bordered className="mt-3">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Description</th>
                    </tr>
                </thead>

                <tbody>

                    {data.specialities.map(sp=>(

                        <tr key={sp._id}>
                            <td>{sp.category}</td>
                            <td>{sp.description}</td>
                        </tr>
                    ))}


                </tbody>
            </Table>
        </div>}

        {data.experience.length>0&&<div className="mt-5" >
            <h1 className="text-center">Experience</h1>

            <Table striped bordered className="mt-3">
                <thead>
                    <tr>
                        <th>Desgination</th>
                        <th>Company</th>
                        <th>From</th>
                        <th>To</th>
                     
                    </tr>
                </thead>

                <tbody>

                    {data.experience.map(exp=>(

                        <tr key={exp._id}>
                            <td>{exp.designation}</td>
                            <td>{exp.company}</td>
                            <td>{moment(exp.from).format('DD-MM-YYYY')}</td>
                            <td>{moment(exp.to).format('DD-MM-YYYY')}</td>
                        </tr>
                    ))}


                </tbody>
            </Table>
        </div>}


        
        {data.education.length>0&&<div className="mt-5">
            <h1 className="text-center">Education</h1>

            <Table striped bordered className="mt-3 mb-5">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Institue</th>
                        <th>From</th>
                        <th>To</th>
                     
                    </tr>
                </thead>

                <tbody>

                    {data.education.map(edu=>(

                        <tr key={edu._id}>
                            <td>{edu.title}</td>
                            <td>{edu.institute}</td>
                            <td>{moment(edu.from).format('DD-MM-YYYY')}</td>
                            <td>{moment(edu.to).format('DD-MM-YYYY')}</td>
                        </tr>
                    ))}


                </tbody>
            </Table>
        </div>}

    </div> );
}
 
export default DetailTable;