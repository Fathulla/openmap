import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-modal";
import * as yup from "yup";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const validationSchema = yup.object({
  comment: yup.string().required("Обязательное поле!"),
  status: yup.string().required("Обязательное поле!"),
});

export const EditPointDataFormModal = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comment: "",
      status: "",
    },
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data) => console.log(data);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button onClick={closeModal}>close</button>
        <h2>Флом</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <>
                <input type="text" placeholder="Комментарий" {...field} />
              </>
            )}
          />

          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};
