

// ===================================================================
// TESTS
// ===================================================================
use aiken/crypto.{Blake2b_224, Hash, VerificationKey}
use cardano/assets
use cardano/transaction.{
  InlineDatum, Input, NoDatum, Output, OutputReference, Transaction, TransactionId,
}
use decentgigs.{CancelJob, JobDatum, ReleasePayment, decentgigs}
use vodka/address.{mock_pub_key_address, mock_pub_key_hex, mock_script_address}
use vodka/mocktail.{
  complete, mocktail_tx, required_signer_hash, with_input, with_output,
}
use vodka/value.{add_value, from_lovelace}

// ---------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------
const employer_pkh: Hash<Blake2b_224, VerificationKey> = mock_pub_key_hex(1)
const freelancer_pkh: Hash<Blake2b_224, VerificationKey> = mock_pub_key_hex(2)

const job_id: ByteArray = "test_job_001"

const usdm_policy_id: ByteArray =
  #"c48cbb3d5e57ed56e276bc45f99ab39abe94e6cd7ac39fb402da47ad"

const usdm_asset_name: ByteArray = #"0014df105553444d"

const usdm_amount: Int = 100_000_000

fn mock_script_utxo_ref() -> OutputReference {
  OutputReference {
    transaction_id: TransactionId {
      hash: #"0000000000000000000000000000000000000000000000000000000000000000",
    },
    output_index: 0,
  }
}

fn mock_datum() -> JobDatum {
  JobDatum { employer: employer_pkh, freelancer: freelancer_pkh, job_id }
}

fn mock_script_output(value: assets.Value) -> Output {
  Output {
    address: mock_script_address(1, None),
    value,
    datum: InlineDatum(mock_datum()),
    reference_script: None,
  }
}

fn mock_employer_output(value: assets.Value) -> Output {
  Output {
    address: mock_pub_key_address(1, None),
    value,
    datum: NoDatum,
    reference_script: None,
  }
}

fn mock_freelancer_output(value: assets.Value) -> Output {
  Output {
    address: mock_pub_key_address(2, None),
    value,
    datum: NoDatum,
    reference_script: None,
  }
}

// ---------------------------------------------------------------
// TEST 1: Successful Release Payment
// ---------------------------------------------------------------
test release_payment_success() {
  let locked_value =
    from_lovelace(2_000_000)
      |> add_value(usdm_policy_id, usdm_asset_name, usdm_amount)

  let script_input =
    Input {
      output_reference: mock_script_utxo_ref(),
      output: mock_script_output(locked_value),
    }

  let freelancer_output = mock_freelancer_output(locked_value)

  let tx =
    mocktail_tx()
      |> with_input(script_input)
      |> with_output(freelancer_output)
      |> required_signer_hash(True, employer_pkh)
      |> required_signer_hash(True, freelancer_pkh)
      |> complete()

  let datum = Some(mock_datum())
  let redeemer = ReleasePayment

  decentgigs(
    usdm_policy_id,
    usdm_asset_name
  ).spend(
    datum,
    redeemer,
    mock_script_utxo_ref(),
    tx
  )
}

// ---------------------------------------------------------------
// TEST 2: Successful Cancel Job
// ---------------------------------------------------------------
test cancel_job_success() {
  let locked_value =
    from_lovelace(2_000_000)
      |> add_value(usdm_policy_id, usdm_asset_name, usdm_amount)

  let script_input =
    Input {
      output_reference: mock_script_utxo_ref(),
      output: mock_script_output(locked_value),
    }

  let employer_output = mock_employer_output(locked_value)

  let tx =
    mocktail_tx()
      |> with_input(script_input)
      |> with_output(employer_output)
      |> required_signer_hash(True, employer_pkh)
      |> required_signer_hash(True, freelancer_pkh)
      |> complete()

  let datum = Some(mock_datum())
  let redeemer = CancelJob

  decentgigs(
    usdm_policy_id,
    usdm_asset_name
  ).spend(
    datum,
    redeemer,
    mock_script_utxo_ref(),
    tx
  )
}

// ---------------------------------------------------------------
// TEST 3: Fail - Missing Employer Signature
// ---------------------------------------------------------------
test release_payment_fail_missing_employer_sig() fail {
  let locked_value =
    from_lovelace(2_000_000)
      |> add_value(usdm_policy_id, usdm_asset_name, usdm_amount)

  let script_input =
    Input {
      output_reference: mock_script_utxo_ref(),
      output: mock_script_output(locked_value),
    }

  let freelancer_output = mock_freelancer_output(locked_value)

  let tx =
    mocktail_tx()
      |> with_input(script_input)
      |> with_output(freelancer_output)
      |> required_signer_hash(True, freelancer_pkh)
      |> complete()

  let datum = Some(mock_datum())
  let redeemer = ReleasePayment

  decentgigs(
    usdm_policy_id,
    usdm_asset_name
  ).spend(
    datum,
    redeemer,
    mock_script_utxo_ref(),
    tx
  )
}

// ---------------------------------------------------------------
// TEST 4: Fail - Missing Freelancer Signature
// ---------------------------------------------------------------
test release_payment_fail_missing_freelancer_sig() fail {
  let locked_value =
    from_lovelace(2_000_000)
      |> add_value(usdm_policy_id, usdm_asset_name, usdm_amount)

  let script_input =
    Input {
      output_reference: mock_script_utxo_ref(),
      output: mock_script_output(locked_value),
    }

  let freelancer_output = mock_freelancer_output(locked_value)

  let tx =
    mocktail_tx()
      |> with_input(script_input)
      |> with_output(freelancer_output)
      |> required_signer_hash(True, employer_pkh)
      |> complete()

  let datum = Some(mock_datum())
  let redeemer = ReleasePayment

  decentgigs(
    usdm_policy_id,
    usdm_asset_name
  ).spend(
    datum,
    redeemer,
    mock_script_utxo_ref(),
    tx
  )
}

// ---------------------------------------------------------------
// TEST 5: Fail - Wrong Recipient
// ---------------------------------------------------------------
test release_payment_fail_wrong_recipient() fail {
  let locked_value =
    from_lovelace(2_000_000)
      |> add_value(usdm_policy_id, usdm_asset_name, usdm_amount)

  let script_input =
    Input {
      output_reference: mock_script_utxo_ref(),
      output: mock_script_output(locked_value),
    }

  let employer_output = mock_employer_output(locked_value)

  let tx =
    mocktail_tx()
      |> with_input(script_input)
      |> with_output(employer_output)
      |> required_signer_hash(True, employer_pkh)
      |> required_signer_hash(True, freelancer_pkh)
      |> complete()

  let datum = Some(mock_datum())
  let redeemer = ReleasePayment

  decentgigs(
    usdm_policy_id,
    usdm_asset_name
  ).spend(
    datum,
    redeemer,
    mock_script_utxo_ref(),
    tx
  )
}

// ---------------------------------------------------------------
// TEST 6: Fail - Insufficient Amount
// ---------------------------------------------------------------
test release_payment_fail_insufficient_amount() fail {
  let locked_value =
    from_lovelace(2_000_000)
      |> add_value(usdm_policy_id, usdm_asset_name, usdm_amount)

  let script_input =
    Input {
      output_reference: mock_script_utxo_ref(),
      output: mock_script_output(locked_value),
    }

  let insufficient_value =
    from_lovelace(2_000_000)
      |> add_value(usdm_policy_id, usdm_asset_name, 50_000_000)

  let freelancer_output = mock_freelancer_output(insufficient_value)

  let tx =
    mocktail_tx()
      |> with_input(script_input)
      |> with_output(freelancer_output)
      |> required_signer_hash(True, employer_pkh)
      |> required_signer_hash(True, freelancer_pkh)
      |> complete()

  let datum = Some(mock_datum())
  let redeemer = ReleasePayment

  decentgigs(
    usdm_policy_id,
    usdm_asset_name
  ).spend(
    datum,
    redeemer,
    mock_script_utxo_ref(),
    tx
  )
}

// ---------------------------------------------------------------
// TEST 7: Fail - Cancel Sent To Freelancer
// ---------------------------------------------------------------
test cancel_job_fail_wrong_recipient() fail {
  let locked_value =
    from_lovelace(2_000_000)
      |> add_value(usdm_policy_id, usdm_asset_name, usdm_amount)

  let script_input =
    Input {
      output_reference: mock_script_utxo_ref(),
      output: mock_script_output(locked_value),
    }

  let freelancer_output = mock_freelancer_output(locked_value)

  let tx =
    mocktail_tx()
      |> with_input(script_input)
      |> with_output(freelancer_output)
      |> required_signer_hash(True, employer_pkh)
      |> required_signer_hash(True, freelancer_pkh)
      |> complete()

  let datum = Some(mock_datum())
  let redeemer = CancelJob

  decentgigs(
    usdm_policy_id,
    usdm_asset_name
  ).spend(
    datum,
    redeemer,
    mock_script_utxo_ref(),
    tx
  )
}

// ---------------------------------------------------------------
// TEST 8: Fail - No Datum Provided
// ---------------------------------------------------------------
test release_payment_fail_no_datum() fail {
  let locked_value =
    from_lovelace(2_000_000)
      |> add_value(usdm_policy_id, usdm_asset_name, usdm_amount)

  let script_input =
    Input {
      output_reference: mock_script_utxo_ref(),
      output: mock_script_output(locked_value),
    }

  let freelancer_output = mock_freelancer_output(locked_value)

  let tx =
    mocktail_tx()
      |> with_input(script_input)
      |> with_output(freelancer_output)
      |> required_signer_hash(True, employer_pkh)
      |> required_signer_hash(True, freelancer_pkh)
      |> complete()

  let redeemer = ReleasePayment
  let datum = None

  decentgigs(
    usdm_policy_id,
    usdm_asset_name
  ).spend(
    datum,
    redeemer,
    mock_script_utxo_ref(),
    tx
  )
}
