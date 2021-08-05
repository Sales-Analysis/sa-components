import React, { ChangeEvent, useRef, useState } from "react";
import classNames from "classnames";
import Loader from "./Loader/Loader";
import { delay } from "./uploadFunction";

import styles from "./UploadArea.module.scss";

interface IUploadAreaProps {
  acceptTypes: string[];
  sizeLimits: {
    size: number;
    type: string;
  };
}

export const UploadArea = ({ acceptTypes, sizeLimits }: IUploadAreaProps) => {
  const triggeredInput = useRef<HTMLInputElement>(null);

  const [state, setState] = useState({
    onDrag: false,
    size: false,
    download: false,
    uploading: false,
    fileName: "",
    fileSize: 0,
  });

  // onDrag отвечает за поведение фона при drag and drop, затемняя его при наведении
  // size - отвечает за отрисовку области загрузки при проверке файла на его размер
  // download - перерисовка компонента при удачной загрузке файла
  // fileName - состояние, в котором хранится имя текущего файла, отображается при загрузке и успешном добавлении файла
  // fileSize - состоние, в котором хранится размер текущего файла, отображается при загрузке и успешном добавлении файла

  const options = {
    multiple: false,
    accept: acceptTypes.join(","),
  };

  // Приводим размеры к байтам

  const makeSizeInBytes = (limits: { size: number; type: string }) => {
    if (limits.type === "Mb" || limits.type === "MB") {
      return limits.size * 1048576;
    } else if (limits.type === "Kb" || limits.type === "KB") {
      return limits.size * 1024;
    } else {
      return limits.size;
    }
  };

  // Проверка файла на тип расширения

  const typeCheck = (fileName: string) => {
    const types = acceptTypes;
    let valid = false;
    types.forEach((elem) => {
      if (valid) return true;
      valid = fileName.includes(elem);
    });
    return false;
  };

  // Загрузка файла

  async function fetchFiles() {
    console.log("Start uploading...");

    await delay(4000);
    setState((prev) => {
      return { ...prev, download: true };
    });

    console.log("Done! File uploaded");
  }

  // приводим state в первоначальное состояние

  const clearState = () => {
    setState({
      onDrag: false,
      size: false,
      download: false,
      uploading: false,
      fileName: "",
      fileSize: 0,
    });
  };

  // ф-я триггер для кастомной кнопки, при клике на нее срабатывает ф-я у input
  const openTrigger = () => triggeredInput.current?.click();

  // пользователь через input выбирает файл, срабатывает данная функция
  const changeHandler = ({ target }: ChangeEvent<HTMLInputElement> | any) => {
    if (target?.files?.length) {
      if (target.files[0].size < makeSizeInBytes(sizeLimits)) {
        setState((prev) => {
          return {
            ...prev,
            uploading: true,
            fileName: target.files[0].name,
            fileSize: Math.round(target.files[0].size / 1048576),
            size: false,
          };
        });
        fetchFiles();
      } else {
        setState((prev) => {
          return { ...prev, size: true };
        });
      }
    }
  };

  // Две функции, которые обрабатывают события наведения на область загрузки и выхода из нее

  const onDragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setState((prev) => {
      return { ...prev, onDrag: true };
    });
  };

  const onDragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setState((prev) => {
      return { ...prev, onDrag: false };
    });
  };

  // Обработка drag & drop после того, как пользователь отпустил файл области

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const files = [...e.dataTransfer.files];
    const firstElem = files[0];
    if (
      files.length === 1 &&
      firstElem.size < makeSizeInBytes(sizeLimits) &&
      typeCheck(firstElem.name)
    ) {
      setState((prev) => {
        return {
          ...prev,
          size: false,
          uploading: true,
          fileSize: Math.round(firstElem.size / 1048576),
          fileName: firstElem.name,
        };
      });

      fetchFiles();

      const formData = new FormData();
      formData.append("file", firstElem);
    } else {
      setState((prev) => {
        return { ...prev, size: true };
      });
    }

    setState((prev) => {
      return { ...prev, onDrag: false };
    });
  };

  return (
    <>
      {state.download ? (
        <div className={styles.container}>
          <div className={styles.file_info}>
            <div>
              <p className={styles.file_name}>{state.fileName}</p>
              <p className={styles.file_size}>{state.fileSize} Мб</p>
            </div>
            <button className={styles.deleteFile} onClick={clearState}></button>
          </div>
          <div className={styles.status}>
            <p className={styles.status_text}>Файл успешно загружен</p>
          </div>
        </div>
      ) : state.uploading ? (
        <div className={styles.container}>
          <div className={styles.uploading_file_info}>
            <div className={styles.uploading_file_container}>
              <Loader />
              <div className={styles.uploading_file_container_div}>
                <p className={styles.file_name}>{state.fileName}</p>
                <p className={styles.file_size}>{state.fileSize} Мб</p>
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
            state.size ? styles.sizeProblems : null,
            state.onDrag ? styles.onDrag : null,
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
          {state.size ? (
            <p className={styles.sizeWarning}>
              Размер файла не должен превышать{" "}
              {`${makeSizeInBytes(sizeLimits) / 1048576} `}
              Мб, а доступные расширения -{` ${options.accept}`}. Выберите
              другой файл и повторите загрузку
            </p>
          ) : null}
        </div>
      )}
    </>
  );
};
