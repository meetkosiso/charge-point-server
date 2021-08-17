# Charge Point Server

A service that accepts request from OCPP and respond accordingly via a WebSocket.

## Authentication

The charge point server authenticates with the OCPP name and a default password: `testing`. The OCPP simulator already uses
this default password.

## To install the charge point server Dependencies

```
npm install
```

## To start the charge point server

```
npm run dev
```

## The CSID recognised by this charge point server for the purpose of testing are:

```
 STATION-01
 STATION-02
 STATION-03
```

## To send a Boot Notification to the charge point server, on the OCPP simulator run:

```
node simulator -s STATION-01 -u ws://localhost:3002
```

## To send a Status Notification to the charge point server, on the OCPP simulator run:

```
node simulator -t status_notification
```

## To run Test

```
npm run test
```
