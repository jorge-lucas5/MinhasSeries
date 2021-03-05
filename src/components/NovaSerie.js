import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

export function NovaSerie() {
    const [isSucesso, setIsSuceso] = useState(false);
    const [form, setForm] = useState({});
    const [generos, setGeneros] = useState([{}]);

    useEffect(() => {
        axios.get('/api/genres').then(res => {
            setGeneros(res.data.data)
        })
    }, []);

    const Change = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    const salvar = () => {
        axios.post('/api/series',
            form
        ).then(res => {
            if (res.status === 200)
                setIsSuceso(true);
        });
    }
    if (isSucesso) {
        return (
            <Redirect to='/series'></Redirect>
        );
    }
    return (
        <div className='container'>
            <h1>Nova Série</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input type="text" className="form-control" id="name" onChange={Change} value={form.name} name='name' placeholder="Informe o nome da série" />
                </div>

                <div className="form-group">
                    <label htmlFor="comments">Comentários</label>
                    <input type="text" className="form-control" id="comments" onChange={Change} value={form.comments} name='comments' placeholder="Comente o que achou da série" />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input onChange={Change} className="form-check-input" type="radio" name="status" id="status1" value="ASSSISTIDO" />
                        <label className="form-check-label" htmlFor="status1">Assistido</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input onChange={Change} className="form-check-input" type="radio" name="status" id="status2" value="PARA ASSISTIR" />
                        <label className="form-check-label" htmlFor="status2">Para assisir</label>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="genre_id">Gênero</label>
                    <select name='genre_id' value={form.genre_id} className='form-control' onChange={Change}>
                        {generos.map(item =>
                            <option key={item.id} value={item.id}>{item.name}</option>
                        )}
                    </select>
                </div>
                <button type="button" onClick={salvar} style={{ marginRight: '10px' }} className="btn btn-primary">Salvar</button>
                <Link className='btn btn-secondary' to='/series'>Voltar</Link>
            </form>
        </div>
    );
}