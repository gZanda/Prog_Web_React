import React, {useState, useEffect} from 'react';
import "./edit.styles.css";

export default function EditTask () {
    function validateForm(e) {
        e.preventDefault();
        console.log("teste")
    }

    return (
        <div className="container mt-4">
            <form onSubmit={validateForm}>
                <div className="form-group">
                    <label htmlFor="descricao">Descrição:</label>
                    <input type="text" className="form-control" id="descricao" name="descricao" required />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select className="form-control" id="status" name="status" required>
                        <option value="pendente">Pendente</option>
                        <option value="concluido">Concluído</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="statusAprovado">Status Aprovado:</label>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="statusAprovado" id="avaliado"
                               value="avaliado" checked />
                            <label className="form-check-label" htmlFor="avaliado">Avaliado</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="statusAprovado" id="naoAvaliado"
                               value="naoAvaliado" />
                            <label className="form-check-label" htmlFor="naoAvaliado">Não Avaliado</label>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="responsavel">Responsável (id):</label>
                    <input type="number" className="form-control" id="responsavel" name="responsavel" required />
                </div>

                <div className={"d-flex justify-content-end"}>
                    <button type="submit" className="btn btn-primary" style={{width: 150}}>Salvar</button>
                </div>
            </form>
        </div>
    );
}