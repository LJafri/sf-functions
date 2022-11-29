
/**
 * Describe Testfunc here.
 *
 * The exported method is the entry point for your code when the function is invoked.
 *
 * Following parameters are pre-configured and provided to your function on execution:
 * @param event: represents the data associated with the occurrence of an event, and
 *                 supporting metadata about the source of that occurrence.
 * @param context: represents the connection to Functions and your Salesforce org.
 * @param logger: logging handler used to capture application logs and trace specifically
 *                 to a given execution of a function.
 */
export default async function (event, context, logger) {
  logger.info(`Invoking Testfunc with payload ${JSON.stringify(event.data || {})}`);

  // const results = await context.org.dataApi.query('SELECT Id, Name FROM Account');

  // logger.info(JSON.stringify(results));

  // return results;
  console.log('Logg info ' + event.data);
  const { priority, subject, description } = event.data;
  if (!subject) {
    throw new Error(`Please provide Subject`);
  }

  const sfCase = {
    type: "Case",
    fields: {
      Subject: `${Date.now()}-${subject}`,
      Description: `${description}`,
      Priority: priority
    },
  };

  try {
    const { id: recordId } = await context.org.dataApi.create(sfCase);
    const soql = `SELECT Fields(STANDARD) from Case Where Id = '${recordId}'`;
    const queryResults = await context.org.dataApi.query(soql);
    return queryResults;
  } catch(err) {
    const errMessage = `Failed to insert record due to ${err.message}`;
    logger.error(errMessage);
    throw new Error(errorMessage);
  }
}
