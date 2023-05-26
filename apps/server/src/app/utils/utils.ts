export const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export function prettyPrintPythonError(type: string, data: unknown) {
  console.log('\n========================================');
  console.log(`${type} START`);
  console.log('========================================\n');
  console.log(data);
  console.log('\n========================================');
  console.log(`${type} END`);
  console.log('========================================\n');
}

export const stringToBoolean = (data?: string) => data === 'true';
