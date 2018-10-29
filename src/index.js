import React, { useState } from "react";
import ReactDOM from "react-dom";

import {
  Button,
  Dialog,
  Heading,
  Link,
  Pane,
  Paragraph,
  Small,
  Text,
  toaster
} from "evergreen-ui";

function Blockquote(props) {
  return (
    <Pane
      borderLeft="2px solid gray"
      marginBottom={24}
      paddingLeft={16}
      {...props}
    />
  );
}

function Cite(props) {
  return <Text {...props} />;
}

function App() {
  const [isShown, setIsShown] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSwitched, setIsSwitched] = useState(false);

  const candidates = [
    <Pane flex={1}>
      <Button
        appearance="primary"
        key="republican"
        intent="danger"
        onClick={() => setHasVoted(true)}
      >
        Vote for Ted Cruz
      </Button>
    </Pane>,

    <Pane flex={1}>
      <Button
        appearance="primary"
        key="democratic"
        onMouseOver={() => setIsSwitched(!isSwitched)}
        onClick={() => setHasVoted(true)}
      >
        Vote for Beto O'Rourke
      </Button>
    </Pane>
  ];

  if (isSwitched) {
    candidates.reverse();
  }

  return (
    <Pane textAlign="center">
      <Heading margin="default" size={900}>
        Hart InterCivic eSlate
        <br />
        <Small fontStyle="italic">Web Edition</Small>
      </Heading>
      <Paragraph />

      <Blockquote>
        <Paragraph>
          In a statement Friday, Hart eSlate said it "simply records the voter’s
          inputs. It does not, and cannot, 'flip' or 'switch' votes." A
          spokesman also said that their voting devices comply with the state's
          Election Code and have been used "reliably across Texas" since 2002.
        </Paragraph>
        <Cite>
          –&nbsp;<Link href="https://www.texastribune.org/2018/10/26/texas-voting-machines-2018-straight-ticket-midterm-elections/">
            TexasTribue.org
          </Link>
        </Cite>
      </Blockquote>

      {hasVoted ? (
        <Dialog hasHeader={false} hasFooter={false} isShown={true}>
          <Heading size={900}>Thanks for voting Republican!</Heading>
        </Dialog>
      ) : (
        [
          <Button disabled={hasVoted} onClick={() => setIsShown(true)}>
            Vote Now!
          </Button>,

          <Dialog
            confirmLabel={isVoting ? "Voting..." : "Cast vote"}
            hasFooter={false}
            isConfirmLoading={isVoting}
            isShown={isShown}
            onCloseComplete={() => {
              setIsVoting(false);
              setIsShown(false);
            }}
            onConfirm={() => {
              setIsVoting(true);

              setTimeout(() => setHasVoted(true), 1000);
            }}
            title="Vote for Texas Senate"
          >
            <Pane display="flex">{candidates}</Pane>
          </Dialog>
        ]
      )}
    </Pane>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
