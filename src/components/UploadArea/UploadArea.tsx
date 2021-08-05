import React, { ChangeEvent, useRef, useState } from "react";
import classNames from "classnames";
import Loader from "./Loader/Loader";
import { delay } from "./uploadFunction";

import styles from "./UploadArea.module.scss";

interface IUploadAreaProps {
  acceptTypes: string[];
  maxSizeOfFileInBytes: number;
}

export const UploadArea = ({
  acceptTypes,
  maxSizeOfFileInBytes,
}: IUploadAreaProps) => {
  const triggeredInput = useRef<HTMLInputElement>(null);
  const [onDrag, setOnDrag] = useState(false);
  const [size, setSize] = useState(false);
  const [download, setDownload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);

  const options = {
    multiple: false,
    accept: acceptTypes.join(","),
  };

  const typeCheck = (fileName: string) => {
    const types = acceptTypes;
    let valid = false;
    types.forEach((elem) => {
      if (valid) return true;
      valid = fileName.includes(elem);
    });
    return valid;
  };

  async function fetchFiles() {
    console.log("Start uploading...");

    await delay(4000);
    setDownload(true);

    console.log("Done! File uploaded");
  }

  const clearState = () => {
    setOnDrag(false);
    setSize(false);
    setDownload(false);
    setUploading(false);
    setFileName("");
    setFileSize(0);
  };
  // ф-я триггер для кастомной кнопки, при клике на нее срабатывает ф-я у input
  const openTrigger = () => triggeredInput.current?.click();

  // пользователь через input выбирает файл, срабатывает данная функция
  const changeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target?.files?.length) {
      if (target.files[0].size < maxSizeOfFileInBytes) {
        setUploading(true);
        setFileName(target.files[0].name);
        setFileSize(Math.round(target.files[0].size / 1048576));
        setSize(false);
        fetchFiles();
      } else {
        setSize(true);
      }
    }
  };

  // Две функции, которые обрабатывают события наведения на область загрузки и выхода из нее
  // onDrag отвечает за поведение фона при drag and drop, затемняя его при наведении

  const onDragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDrag(true);
  };

  const onDragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDrag(false);
  };

  // Обработка drag & drop после того, как пользователь отпустил файл области
  // setSize - отвечает за отрисовку области загрузки при проверке файла на его размер
  // setDownload - перерисовка компонента при удачной загрузке файла
  // setFileName - состояние, в котором хранится имя текущего файла, отображается при загрузке и успешном добавлении файла
  // setFileSize - состоние, в котором хранится размер текущего файла, отображается при загрузке и успешном добавлении файла
  // UploadFunction() - обособленная функция, которая делает запрос на сервер и отвечает за отрисовку компонента в момент загрузки файла

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const files = [...e.dataTransfer.files];
    const firstElem = files[0];
    if (
      files.length === 1 &&
      firstElem.size < maxSizeOfFileInBytes &&
      typeCheck(firstElem.name)
    ) {
      setSize(false);
      setUploading(true);
      setFileSize(Math.round(firstElem.size / 1048576));
      setFileName(firstElem.name);

      fetchFiles();

      const formData = new FormData();
      formData.append("file", firstElem);
    } else {
      setSize(true);
    }

    setOnDrag(false);
  };

  return (
    <>
      {download ? (
        <div className={styles.container}>
          <div className={styles.file_info}>
            <div>
              <p className={styles.file_name}>{fileName}</p>
              <p className={styles.file_size}>{fileSize} Мб</p>
            </div>
            <button className={styles.deleteFile} onClick={clearState}></button>
          </div>
          <div className={styles.status}>
            <p className={styles.status_text}>Файл успешно загружен</p>
          </div>
        </div>
      ) : uploading ? (
        <div className={styles.container}>
          <div className={styles.uploading_file_info}>
            <div className={styles.uploading_file_container}>
              <Loader />
              <div className={styles.uploading_file_container_div}>
                <p className={styles.file_name}>{fileName}</p>
                <p className={styles.file_size}>{fileSize} Мб</p>
              </div>
            </div>

            <button className={styles.deleteFile} onClick={clearState}></button>
          </div>
          <div className={styles.uploading_status}>
            <p className={styles.status_text}>Файл загружается...</p>
          </div>
        </div>
      ) : (
        <div
          className={classNames(
            size ? styles.sizeProblems : null,
            onDrag ? styles.onDrag : null,
            styles.UploadArea
          )}
          onDragStart={(e) => onDragStartHandler(e)}
          onDragLeave={(e) => onDragLeaveHandler(e)}
          onDragOver={(e) => onDragStartHandler(e)}
          onDrop={(e) => onDropHandler(e)}
        >
          <p className={styles.text}>
            Загрузите файл простым переносом или нажмите для выбора файла
          </p>
          <input
            className={styles.input}
            type="file"
            ref={triggeredInput}
            onChange={changeHandler}
            {...options}
          ></input>
          <button className={styles.btn} onClick={openTrigger}>
            Выбрать файл
          </button>
          {size ? (
            <p className={styles.sizeWarning}>
              Размер файла не должен превышать{" "}
              {`${maxSizeOfFileInBytes / 1048576} `}
              Мб, а доступные расширения -{` ${options.accept}`}. Выберите
              другой файл и повторите загрузку
            </p>
          ) : null}
        </div>
      )}
    </>
  );
};
