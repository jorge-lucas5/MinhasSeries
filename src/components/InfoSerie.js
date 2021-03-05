import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Badge } from "reactstrap";
//28 min
export function InfoSerie({ match }) {
    const [isSucesso, setIsSuceso] = useState(false);
    const [data, setData] = useState({});
    const [generos, setGeneros] = useState([{}]);
    const [form, setForm] = useState({});
    const [modeEdit, setModeEdit] = useState(true);

    useEffect(() => {
        axios.get('/api/series/' + match.params.id)
            .then(response => {
                setData(response.data);
                setForm(response.data);
            });
        axios.get('/api/genres').then(res => {
            setGeneros(res.data.data)
        })
    }, [match.params.id]);

    const salvar = () => {
        axios.put('/api/series/' + match.params.id, form)
            .then(res => {
                setIsSuceso(true);
            });
    }


    const masterHeader = {
        height: '50vh',
        minHeight: '675px',
        backgroundImage: `url(${data.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }

    const Change = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    if (isSucesso) {
        return (
            <Redirect to='/series'></Redirect>
        );
    }

    return (
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img className='img-fluid img-thumbnail' src={data.poster} alt="poster" />
                            </div>
                            <div className='col-8'>
                                <h1 className='font-weight-light text-white'>{data.name}</h1>
                                <div className='lead text-white'>
                                    {data.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge>}
                                    {data.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para Assisir</Badge>}
                                   Gênero: {data.genre}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className='container'>
                <button className='btn btn-primary' onClick={() => setModeEdit(!modeEdit)}>{modeEdit ? 'Cancelar edição' : 'Editar'}</button>
            </div>

            {
                modeEdit &&
                <div className='container'>
                    <h1>Info Série</h1>
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
                                <input onChange={Change} checked={form.status === 'ASSISTIDO'} className="form-check-input" type="radio" name="status" id="status1" value="ASSISTIDO" />
                                <label className="form-check-label" htmlFor="status1">Assistido</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input onChange={Change} checked={form.status === 'PARA_ASSISTIR'} className="form-check-input" type="radio" name="status" id="status2" value="PARA_ASSISTIR" />
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

            }
        </div >

    );
}