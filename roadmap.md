### send NFT process
#### 1. submit transaction
* Gather form data
* Use data to fire request below in parallel:
  1. fleek storage - txn details storage
    * [docs#upload](https://docs.fleek.co/storage/fleek-storage-js/#upload)
  2. zora APIs - minting process
* Fail -> inform user (report), prompt retry retry (handle)
* API request ->
* Success -> redirect

