import React from 'react'
import render from 'riteway/render-component'
import { describe } from 'riteway'
import match from 'riteway/match'
import ViewNFT from './component'

describe('viewNFT component', async (assert) => {
  const nftName = 'My NFT'
  const price = 2
  const description = 'My NFT Description'
  const imgSrc = '/my-nft.jpg'
  const $ = render(
    <ViewNFT
      nftName={nftName}
      price={price}
      description={description}
      imgSrc={imgSrc}
    />
  )
  const contains = match($('.nftWrapper').html())

  assert({
    given: 'an nftName',
    should: 'render contain the nftName text',
    actual: contains(nftName),
    expected: nftName
  })

  assert({
    given: 'a price props',
    should: 'render contain the price',
    actual: contains(price),
    expected: price.toString()
  })

  assert({
    given: 'a description',
    should: 'render contain the description text',
    actual: contains(description),
    expected: description
  })
  assert({
    given: 'an imgSrc prop',
    should: 'render an img tag with the imgSrc prop',
    actual: contains(imgSrc),
    expected: imgSrc
  })
})
