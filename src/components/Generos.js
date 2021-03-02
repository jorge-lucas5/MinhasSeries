import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function Generos() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('/api/genres').then(res => {
            setData(res.data.data)
        })
    }, []);

    const deleteGenero = (id) => {
        axios.delete('/api/genres/' + id).then(res => {
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
                <td>
                    <button className='btn btn-danger' onClick={() => { deleteGenero(record.id) }}>-</button>
                    <Link to={'/generos/' + record.id} className='btn btn-info'>Editar</Link>
                </td>
            </tr>
        );
    };



    if (data.length === 0) {
        return (
            <div className='container'>
                <Link to='generos/novo' className='btn btn-primary'>Novo Gênero</Link>
                <div className='alert alert-warning' role='alert'>
                    Você não possui gêneros cadastrados!
                </div>
            </div>
        );
    }

    return (
        <div className='container'>
            <h1>Gêneros</h1>
            <Link to='generos/novo' className='btn btn-primary'>Novo Gênero</Link>
            <hr />
            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome</th>
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
