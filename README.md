<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adivinanza del Día - 20 preguntas diarias</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f3f3f3;
            text-align: center;
            padding: 20px;
        }

        #container {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 0 auto;
        }

        h1 {
            color: #3498db;
            font-size: 2.5rem;
        }

        .riddle-container {
            margin-top: 20px;
        }

        input[type="text"] {
            padding: 10px;
            width: 80%;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        button {
            padding: 10px 20px;
            background-color: #2ecc71;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
        }

        button:hover {
            background-color: #27ae60;
        }

        #message {
            margin-top: 20px;
            font-size: 1.2rem;
        }

        #score-container {
            margin-top: 30px;
            background-color: #dff9fb;
            padding: 20px;
            border-radius: 5px;
        }

        #score-container h2 {
            color: #34495e;
        }

        #score-container p {
            font-size: 1.2rem;
        }

        footer {
            margin-top: 30px;
            font-size: 0.9rem;
            color: #888;
        }
    </style>
</head>
<body>
    <div id="container">
        <h1>Adivinanza del Día</h1>
        <div class="riddle-container">
            <p id="riddle">Cargando adivinanza...</p>
            <input type="text" id="answer" placeholder="Escribe tu respuesta aquí">
            <button onclick="checkAnswer()">Enviar</button>
            <p id="message"></p>
        </div>
        
        <div id="score-container">
            <h2>Puntaje diario</h2>
            <p id="score">0 respuestas correctas hoy</p>
        </div>
    </div>

    <footer>
        Copyright 2024 © Open ai User Samuell_fb
    </footer>

    <script>
        // Adivinanzas con sus respuestas
        const riddles = [
            { question: "Soy más poderoso que Dios y más malvado que el diablo. Los pobres me tienen y los ricos me necesitan. ¿Qué soy?", answer: "nada" },
            { question: "Mientras más tengo, menos peso. ¿Qué soy?", answer: "un agujero" },
            { question: "Me puedes romper sin siquiera tocarme. ¿Qué soy?", answer: "una promesa" },
            // Añadir más preguntas...
        ];

        // Elegir 20 preguntas al azar cada día
        const totalQuestions = 20;
        let selectedRiddles = [];
        let answeredCount = 0;
        let correctCount = 0;

        // Cargar progreso si existe
        function loadProgress() {
            const today = new Date().toDateString();
            const storedDate = localStorage.getItem('lastDate');
            if (storedDate === today) {
                correctCount = parseInt(localStorage.getItem('correctCount'), 10) || 0;
                answeredCount = parseInt(localStorage.getItem('answeredCount'), 10) || 0;
                selectedRiddles = JSON.parse(localStorage.getItem('selectedRiddles')) || [];
            } else {
                // Reiniciar para el nuevo día
                correctCount = 0;
                answeredCount = 0;
                localStorage.setItem('lastDate', today);
                generateRandomRiddles();
            }
            updateScore();
        }

        // Guardar progreso
        function saveProgress() {
            localStorage.setItem('correctCount', correctCount);
            localStorage.setItem('answeredCount', answeredCount);
            localStorage.setItem('selectedRiddles', JSON.stringify(selectedRiddles));
        }

        // Generar 20 adivinanzas al azar
        function generateRandomRiddles() {
            while (selectedRiddles.length < totalQuestions) {
                const randomIndex = Math.floor(Math.random() * riddles.length);
                if (!selectedRiddles.includes(riddles[randomIndex])) {
                    selectedRiddles.push(riddles[randomIndex]);
                }
            }
            displayNextRiddle();
        }

        // Mostrar la siguiente adivinanza
        function displayNextRiddle() {
            if (answeredCount < selectedRiddles.length) {
                document.getElementById('riddle').textContent = selectedRiddles[answeredCount].question;
            } else {
                document.getElementById('riddle').textContent = "¡Has respondido todas las preguntas de hoy!";
            }
        }

        // Verificar la respuesta
        function checkAnswer() {
            const userAnswer = document.getElementById('answer').value.toLowerCase().trim();
            const messageElement = document.getElementById('message');

            if (answeredCount < selectedRiddles.length) {
                if (userAnswer === selectedRiddles[answeredCount].answer) {
                    messageElement.textContent = "¡Correcto!";
                    messageElement.style.color = "green";
                    correctCount++;
                } else {
                    messageElement.textContent = "Incorrecto. Intenta de nuevo.";
                    messageElement.style.color = "red";
                }
                answeredCount++;
                saveProgress();
                updateScore();
                displayNextRiddle();
            }
        }

        // Actualizar puntaje
        function updateScore() {
            document.getElementById('score').textContent = `${correctCount} respuestas correctas hoy`;
        }

        // Inicializar
        loadProgress();
    </script>
</body>
</html>
