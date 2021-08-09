// export function fetchFiles() {
//   console.log('Start uploading...')
//   let download = false
//   setTimeout(function uplfunc() {
//     download = !download
//     console.log('done')
//     UploadFunction(download)
//   }, 6000)
// }
// function UploadFunction(download: boolean): boolean {
//   return download
// }

// export const UploadFunction = () => {
//   return new Promise((resolve) => setTimeout(() => resolve(null), 2000))
// }

// UploadFunction().then(() => console.log('done'))

export const delay = (ms: number) => {
  return new Promise((r) => setTimeout(() => r(null), ms));
};

export let downloadResult = false;

export async function fetchFiles() {
  console.log("Start uploading...");

  await delay(4000);
  const result = !downloadResult;
  console.log("done");
  downloadResult = result;
}

export function uply() {
  return true;
}
