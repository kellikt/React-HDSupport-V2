<?php 

// initialize DB connection
require_once "./database/connect_db_prod.php";
$uuid = $_SESSION['uuid'];
$startPage = "";

/* Use this $_SESSION["host"] assignment if page is being served from www.hawaii.edu/help/hdsupport */
$_SESSION["host"] = "https://www.hawaii.edu/help/hdsupport/";
$_SESSION["offset"] = 16;
 
/*Setup variables for CAS host and parameters*/
$casServer = "https://authn.hawaii.edu/cas/";
//    $casServer = "https://cas-test.its.hawaii.edu/cas/";
$me = substr($_SERVER["PHP_SELF"], $_SESSION["offset"]);
$startPage = $_SESSION["host"] . $me;


if (!$_SESSION['uuid']) {

	if (isset($_REQUEST['ticket'])) {
		$ticket = $_REQUEST['ticket'];
	}

	if (!empty($ticket)) {
		$getstr = "";
		if (!empty($_REQUEST)) {
			$flag = 0;
			foreach ($_REQUEST as $key => $value) {
				if ($key != 'ticket') {
					if ($flag == 0) {
						$getstr .= "?$key=$value";
						$flag = 1;
					} else if ($flag == 1) {
						$getstr .= "&$key=$value";
					}//end if
				} // END if ($key != 'ticket')
			}//end foreach
			setcookie("hdsupport-getstr", $getstr);
		}//end if

		$data = '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
    <SOAP-ENV:Header/>
    <SOAP-ENV:Body>
    <samlp:Request xmlns:samlp="urn:oasis:names:tc:SAML:1.0:protocol" MajorVersion="1"
        MinorVersion="1" RequestID="' . $_SERVER['REMOTE_ADDR'] . '.' . time() . '"
        IssueInstant="' . date('Y-m-d\TG:i:s.uT') . '">
        <samlp:AssertionArtifact>
            ' . $ticket . '
        </samlp:AssertionArtifact>
    </samlp:Request>
</SOAP-ENV:Body>
</SOAP-ENV:Envelope>';

		//CAS server address to check for ticket validity
		$request = $casServer . 'samlValidate?TARGET=' . $startPage;

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $request);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
		//make sure it returns a response
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

		//setup data sent to CAS server
		curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: text/xml", "Content-length: " . strlen($data)));
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

		//get response from CAS server
		$soapResponse = curl_exec($ch);

		//parse CAS server response. Convert text XML response to DOM object
		$doc = new DOMDocument();
		$doc->loadXML($soapResponse);

		//get status code to check if ticket validated successfully
		$statusCodeNode = $doc->getElementsByTagName('StatusCode');
		$statusCode = $statusCodeNode->item(0)->getAttribute('Value');
		if (($statusCode == 'samlp:Success') || ($statusCode == 'saml1p:Success')) {
			//ticket validated, put all attributes returned into a session variable
			$attributes = $doc->getElementsByTagName('Attribute');
			foreach ($attributes as $node) {
				$nodeValue = $node->getElementsByTagName('AttributeValue');
				$_SESSION[$node->getAttribute('AttributeName')] = trim($nodeValue->item(0)->nodeValue);
				for ($i = 1; $i < $nodeValue->length; $i++) {
					if (!empty($nodeValue->item($i)->nodeValue)) {
						$_SESSION[$node->getAttribute('AttributeName')] .= ',' . trim($nodeValue->item($i)->nodeValue);
					} //END if(!empty($nodeValue->item($i)->nodeValue))
				} //END for($i = 1; $i < $nodeValue->length; $i++)
			} //END foreach($attributes as $node)
			//set session variable names for data returned from CAS
			$_SESSION['username'] = strtolower($_SESSION['uid']);
			if ($_SESSION['uhUuid'] == "") {
				$_SESSION['uuid'] = "00000000";
			} else {
				$_SESSION['uuid'] = strtolower($_SESSION['uhUuid']);
			}

			if (isset($_COOKIE["hdsupport-getstr"])) {
				$getstr = $_COOKIE["hdsupport-getstr"];
				setcookie("hdsupport-getstr", "");
				$startPage .= $getstr;
			} //END if(isset($_COOKIE["hdsupport-getstr"]))

		} else {
			//ticket not validated, so clear session variables
			unset($_SESSION['username']);
			unset($_SESSION['uuid']);
			unset($_SESSION['uid']);
			unset($_SESSION['eduPersonAffiliation']);
			unset($_SESSION['sn']);
			unset($_SESSION['eduPersonOrgDN']);
			unset($_SESSION['uhUuid']);
			unset($_SESSION['cn']);
			unset($_SESSION['uhOrgAffiliation']);
			unset($_SESSION['givenName']);
			session_destroy();
		} //END if($statusCode == 'samlp:Success')

	} else {

		header('Location: ' . $casServer . 'login?service=' . $startPage);
		exit;

	} //END if(!empty($ticket))

	header('Location: ' . $startPage);
	exit;

} else {

	$userResult = mysqli_query($GLOBALS['mysqli'], "SELECT * FROM users WHERE expired=0 and uuid=" . $uuid);

	if (!($user_row = mysqli_fetch_assoc($userResult))) {
		session_destroy();
		$startPage = $_SESSION["host"] . "noauth.php";
		header("Location: " . $startPage);
		exit;
	}

	$_SESSION["me"] = $_SERVER["PHP_SELF"];

} //END if(!$_SESSION['uuid'])

?>