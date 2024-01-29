process.env['RSS_name1'] = 'value1';
process.env['RSS_name2'] = 'value2';
process.env['RSS_name3'] = 'value3';
process.env['RSS_name4'] = 'value4';

const parseEnv = () => {
    const rssVariables = Object.entries(process.env)
        .filter(([key, _]) => key.startsWith('RSS_'))
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');

    console.log(rssVariables);
};

parseEnv();
