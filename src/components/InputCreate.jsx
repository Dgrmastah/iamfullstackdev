import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InputCreate () {
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        try{
            const response = await fetch('http://localhost:3000/create', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({title}),
            });

            if (response.ok) {
                console.log('Tarea creada correctamente'),
                setTitle('');
                navigate('/');
            } else {
                console.error('Error al crear la tarea');
            }
        } catch (error) {
            console.error('Error de red', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{marginTop: '2rem'}}>
            <input 
            type="text"
            placeholder="Nueva tarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
            <button type="submit">Crear Tarea</button>
        </form>
    );
};

export default InputCreate;