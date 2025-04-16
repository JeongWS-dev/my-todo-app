// src/components/ConfirmModal.tsx
import React from "react";
import { useTodoContext } from "../../contexts/TodoContext";
import "./ConfirmModal.css";

interface Props {
  message: string;
  targetId: string;
  closeModal: () => void;
}

const ConfirmModal: React.FC<Props> = ({ message, targetId, closeModal }) => {
  const { handleDelete } = useTodoContext();

  const handleConfirm = () => {
    handleDelete(targetId); // Context에서 삭제 실행
    closeModal(); // 모달 닫기
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={handleConfirm}>Yes</button>
          <button onClick={closeModal}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
