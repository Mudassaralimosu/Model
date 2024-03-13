import "./App.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState } from "react";

const App = () => {
    const [textToCopy, setTextToCopy] = useState();
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration: 1000
    });
    const [botResponse, setBotResponse] = useState('');

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return null;
    }

    const handleCopy = () => {
        setTextToCopy(transcript);
        setCopied();
        handleSpeechResponse(transcript); 
    };

    const handleSpeechResponse = (input) => {
        // Simple example: If the user says "hello," reply with "hi"
        if (input.toLowerCase().includes('hello')) {
            const response = 'Hi there!';
            setBotResponse(response);
            speakText(response);
        }
        
        else {
            const response = 'I did not understand. Please try again.';
            setBotResponse(response);
            speakText(response);
        }
    };

    const speakText = (text) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    };

    return (
        <>
            <div className="container">
                <h2>AI BOT</h2>
                <br />

                <div className="main-content" onClick={handleCopy}>
                    <div>
                        <strong>User:</strong> {transcript}
                    </div>
                    <div>
                        <strong>Bot:</strong> {botResponse}
                    </div>
                </div>

                <div className="btn-style">
                    <button onClick={handleCopy}>
                        {isCopied ? 'Speaking...' : 'Bot Response'} 
                    </button>
                    <button onClick={startListening}>Start Listening</button>
                    <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
                    <button onClick={() => speakText(transcript)}>User Said</button> {/* Text-to-speech button */}
                </div>
            </div>
        </>
    );
};

export default App;
