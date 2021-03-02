import React, { useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

export function NovoGenero() {
    const [nome, setNome] = useState('');
    const [isSucesso, setIsSuceso] = useState(false);
    const handleChange = (e) => {
        setNome(e.target.value);
    }
    const salvar = () => {
        axios.post('/api/genres', {
            name: nome
        }).then(res => {
            if (res.status === 200)
                setIsSuceso(true);
        });
    }
    if (isSucesso) {
        return (
            <Redirect to='/generos'></Redirect>
        );
    }
    return (
        <div className='container'>
            <h1>Novo Gênero</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="nome">Gênero</label>
                    <input type="text" onChange={handleChange} className="form-control" id="nome" placeholder="Informe o nome do genêro" />
                </div>
                <button type="button" onClick={salvar} style={{ marginRight: '10px' }} className="btn btn-primary">Salvar</button>
                <Link className='btn btn-secondary' to='/generos'>Voltar</Link>
            </form>
        </div>
    );
}