## NextJs

### Setup
set OPENAI_API_KEY variable in .env.local file

### Run locally
```sh
npm run dev
# or
yarn dev
```

## Docker

### Build Container
```sh
docker build -t nextjs-openai .
```

### Run Container
```sh
docker run -p 3000:3000 nextjs-openai
```

### Navigate to localhost
```sh
http://localhost:3000/
```


## OpenAI
### Prepare Data For Training
```sh
openai tools fine_tunes.prepare_data -f model_training.jsonl
```