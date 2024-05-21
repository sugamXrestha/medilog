import React, { useState, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2'
import API from '../../API';
import { useParams } from 'react-router-dom';


const prescriptionSchema = yup.object().shape({
    prescription: yup.string().required('Prescription is required'),
    time: yup.string().oneOf(
      ['morning', 'noon', 'night', 'morning-night', 'morning-noon-night'],
      'Invalid time value'
    ).required('Time is required'),
    till: yup.date().typeError('Date is required').required('Till date is required')
  });

const AddPrescriptionSchema = yup.object().shape({
    hospitalId: yup.string().required('Hospital name is required'),
    doctorId: yup.string().required('Diagnosed doctor is required'),
    diagnosedOn: yup.date().typeError('Diagnosed date is required').required('Diagnosed date is required'),
    examinationDetail: yup.string().required('Examination detail is required'),
    prescriptions: yup.array().of(prescriptionSchema).required('At least one prescription is required')
  })

function AddSpecificPrescriptionComponent() {

    const token = localStorage.getItem("token") ?? "";
    const patientId = useParams();
    const [doctorList, setDoctorList] = useState([]);
    const [hospitalData, setHospitalData] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(AddPrescriptionSchema),
      });
    const [prescriptions, setPrescriptions] = useState([{ prescription: '', time: '', till: '' }]);

    const handleAddMore = () => {
        setPrescriptions([...prescriptions, { prescription: '', time: '', till: '' }]);
    };

    const handlePrescriptionChange = (index, event) => {
        const { name, value } = event.target;
        const newPrescriptions = prescriptions.slice();
        newPrescriptions[index][name] = value;
        setPrescriptions(newPrescriptions);
    };

    const getDoctor = () =>{
        API.get("/user", {
            header: {
                Authorization: `Bearer ${token}`
            }
        }).then(response =>{
            const doctors = response.data.filter(user => user.role === "doctor");
            setDoctorList(doctors);

        }).catch(err =>{
            console.log(err);
        })
    }
    const getHospital = () =>{
        API.get("/hospital-detail", {
            header: {
                Authorization: `Bearer ${token}`
            }
        }).then(response =>{
            // console.log(response.data)
            setHospitalData(response.data);

        }).catch(err =>{
            console.log(err);
        })
    }

    

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
        const year = date.getFullYear();

    // Construct formatted date string
    return `${day} ${month} ${year}`;
    };

    const addPrescription = ((data) =>{

        const formattedData = {
            ...data,
            patientId: patientId.id,
            diagnosedOn: formatDate(data.diagnosedOn),
            prescriptions: data.prescriptions.map(prescription => ({
                ...prescription,
                till: formatDate(prescription.till)
            }))
        };

        formattedData.diagnosedOn = formattedData.diagnosedOn.toString();
        formattedData.prescriptions.forEach(prescription => {
        prescription.till = prescription.till.toString();
    });
        
        console.log(formattedData)
        API.post('/prescription',formattedData, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        }).then(res =>{
            Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
        });
        reset();
        }).catch((error)=>{
            console.log(error);
        });
    })
   
    useEffect(() =>{
        getDoctor();
        getHospital();
    }, []); 

  return (
    <>
        <div className="container">
            <p>Person Name</p>
            <form action="" className='prescriptionForm' onSubmit={handleSubmit(addPrescription)}>
                <div className="form-group mb-2">
                    <p htmlFor="">Hospital Name</p>
                    <select name='hospitalName'
                        {...register("hospitalId")}
                        className="form-control"
                        defaultValue={hospitalData.id}>
                    {hospitalData.map((hData) =>{
                        return(
                            <option key={hData._id} value={hData._id}>{hData.hospitalName}</option>
                        )
                    })}
                    </select>
                    <a className='text-danger'>
                      {errors.hospitalName?.message && <span> {errors.hospitalName?.message}</span>}
                    </a>
                </div>
                <div className="row">
                    <div className="col form-group mb-2">
                        <p htmlFor="">Diagnosed by: </p>
                        <select defaultValue="" name='diagnosedBy'
                        {...register("doctorId")}
                        className="form-control">
                        <option value="" disabled>Select Doctor</option>
                        {doctorList.map((doctorItem) => (
                            <option key={doctorItem._id} value={doctorItem._id}>{doctorItem.name}</option>
                        ))}
                    </select>
                        <a className='text-danger'>
                            {errors.doctorId?.message && <span> {errors.doctorId?.message}</span>}
                        </a>
                    </div>
                    <div className="col form-group mb-2">
                        <p htmlFor="">Diagnosed on: </p>
                        <input type="date" {...register("diagnosedOn")} className="form-control" />
                        <a className='text-danger'>
                            {errors.diagnosedOn?.message && <span> {errors.diagnosedOn?.message}</span>}
                        </a>
                    </div>

                </div>
                <div className="form-group mb-2">
                    <p htmlFor="">Examination Detail</p>
                    <textarea {...register("examinationDetail")} className="form-control" />
                    <a className='text-danger'>
                      {errors.examinationDetail?.message && <span> {errors.examinationDetail?.message}</span>}
                    </a>
                </div>
                <p>Prescription</p>
                {prescriptions.map((prescriptionObj, index) => (
                    <div key={index} className='row'>
                    <div className=" col form-group mb-2" >
                        <label htmlFor="">Prescription {index + 1}:</label>
                        <input
                        type="text"
                        className="form-control"
                        width="50%" 
                        name="prescription"
                        value={prescriptions.prescription}
                        onChange={(event) => handlePrescriptionChange(index, event)}
                        {...register(`prescriptions[${index}].prescription`)}
                        />
                        <span className='text-danger'> {errors.prescriptions?.[index]?.prescription?.message}</span>
                    </div>
                    <div className="col-3 form-group mb-2">
                        <label htmlFor="">Time in a day:</label>
                        <select 
                        className="form-control"
                        defaultValue=""
                        name="time"
                        value={prescriptions.time}
                        onChange={(event) => handlePrescriptionChange(index, event)}
                        {...register(`prescriptions[${index}].time`)}
                        >
                            <option value="" disabled>Select Time</option>
                            <option value="morning">Morning</option>
                            <option value="noon">Noon</option>
                            <option value="night">Night</option>
                            <option value="morning-night">Morning Night</option>
                            <option value="morning-noon-night">Morning Noon Night</option>
                        </select>
                        <span className='text-danger'> {errors.prescriptions?.[index]?.time?.message}</span>
                    </div>
                    <div className="col-3 form-group mb-2">
                        <label htmlFor="">Till:</label>
                        <input
                        type="date"
                        className="form-control"
                        name="till"
                        value={prescriptions.till}
                        onChange={(event) => handlePrescriptionChange(index, event)}
                        {...register(`prescriptions[${index}].till`)}
                        />
                        <span className='text-danger'> {errors.prescriptions?.[index]?.till?.message}</span>
                    </div>
                    
                    </div>
                ))}
                <button type="button" className='btn btn-primary' onClick={handleAddMore}>+</button>
                <button type="submit" className="btn btnSubmit btn-success">Save</button>
            </form>
        </div>
    </>
  )
}

export default AddSpecificPrescriptionComponent