import { FormEvent, useState } from "react";
import "./Input.css";
import { Button } from "@mui/material";

interface InputProps {
  onSubmit: (input: string) => void;
}

const Input = ({ onSubmit }: InputProps) => {
  const [input, setInput] = useState("");
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input) return;

    onSubmit(input);

    setInput("");
  };
  return (
    <div className="container">
      <form className="container" action="submit" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type your work"
        />
        <Button
          type="submit"
          variant="contained"
          className="button"
          style={{ height: "40px", borderRadius: "20px" }}
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default Input;
