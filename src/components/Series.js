import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function Series() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('/api/series').then(res => {
            setData(res.data.data)
        })
    }, []);

    const deleteSerie = (id) => {
        axios.delete('/api/series/' + id).then(res => {
            console.log(res);
            if (res.status === 200) {
                let filtro = data.filter(item => item.id !== id);
                setData(filtro);
            }

        })
    }

    const renderizaLinha = record => {
        return (
            <tr key={record.id}>
                <th scope="row">{record.id}</th>
                <td>{record.name}</td>
                <td>{record.genre}</td>
                <td>{record.status}</td>
                <td>
                    <button className='btn btn-danger' onClick={() => { deleteSerie(record.id) }}>-</button>
                    <Link to={'/series/info/' + record.id} className='btn btn-info'>info</Link>
                </td>
            </tr>
        );
    };



    if (data.length === 0) {
        return (
            <div className='container'>
                <h1>Séries</h1>
                <Link to='series/nova' className='btn btn-primary'>Nova Série</Link>
                <div className='alert alert-warning' role='alert'>
                    Você não possui Séries cadastradas!
                </div>
            </div>
        );
    }

    return (
        <div className='container'>
            <h1>Séries</h1>
            <Link to='series/nova' className='btn btn-primary'>Nova Série</Link>
            <hr />
            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Gênero</th>
                        <th scope="col">Status</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderizaLinha)}
                </tbody>
            </table>
        </div>
    );
}
