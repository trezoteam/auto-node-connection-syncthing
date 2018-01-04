'use strict'

import Promise from 'bluebird'
import request from 'request'
import config from 'config'

export default function () {
	return Promise.resolve()
		.then(getLocalDeviceId)
		.then(getDeviceConfig)
		.then(addMasterDeviceToLocalConfig)
		.then(attachMasterDeviceToLocalConfig)
		.then(addLocalDeviceToMasterConfig)
		.then(attachLocalDeviceToMasterConfig)
}

function getLocalRestSystemConfigEndpoint() {
	return 'http://syncthing:8384/rest/system/config'
}

function getMasterRestSystemConfigEndpoint() {
	return config.get('Syncthing.masterEndpoint') + '/rest/system/config'
}

function getRestSystemDiscoveryEndpoint() {
	return config.get('Syncthing.masterEndpoint') + '/rest/system/discovery'
}

export function getLocalDeviceId() {
	let syncthingConfig = config.get('Syncthing.node')
	syncthingConfig.url = getLocalRestSystemConfigEndpoint()
	return Promise.resolve(syncthingConfig)
}

function getMasterDeviceId() {
	let syncthingConfig = config.get('Syncthing.master')
	syncthingConfig.url = getLocalRestSystemConfigEndpoint()
	return Promise.resolve(syncthingConfig)
}

function getDeviceConfig(options) {
	return new Promise((Resolve, Reject) => {
		return request(options, (error, response, body) => {
			let deviceConfig = JSON.parse(body)
			Resolve(deviceConfig)
		})
	})
}

function getListPendingAcceptDeviceIds(masterDeviceConfig) {
	return new Promise((Resolve, Reject) => {
		let syncthingConfig = config.get('Syncthing.master')
		syncthingConfig.url = getMasterRestSystemConfigEndpoint()

		return request(syncthingConfig, (error, response, body) => {
			let pendingList = JSON.parse(body)
			Resolve(Object.keys(pendingList))
		})
	})
}

function addMasterDeviceToLocalConfig(localDeviceConfig) {
	let baseNewDeviceConfig = config.get('BaseNodeConfig')
	localDeviceConfig.devices.push(baseNewDeviceConfig)
	localDeviceConfig.folders[0].devices.push({deviceID: baseNewDeviceConfig.deviceID, introducedBy: ""})
	return Promise.resolve(localDeviceConfig)
}

function addLocalDeviceToMasterConfig() {
	return Promise.resolve()
		.then(getMasterDeviceId)
		.then(getDeviceConfig)
		.then((masterDeviceConfig) => {

			return new Promise((Resolve, Reject) => {
				let syncthingConfig = config.get('Syncthing.master')
				syncthingConfig.url = getRestSystemDiscoveryEndpoint()

				return request(syncthingConfig, (error, response, body) => {
					let pendingList = Object.keys(JSON.parse(body))

					let baseNewDeviceConfig = config.get('BaseNodeConfig')
					pendingList.forEach((deviceID) => {
						baseNewDeviceConfig.deviceId = deviceID

						masterDeviceConfig.devices.push(baseNewDeviceConfig)
						masterDeviceConfig.folders[0].devices.push({deviceID: baseNewDeviceConfig.deviceID, introducedBy: ""})
					})

				Resolve(masterDeviceConfig)
				})
			})
		})
}

function attachMasterDeviceToLocalConfig(deviceConfig) {
	return new Promise((Resolve, Reject) => {
		let syncthingConfig = config.get('Syncthing.node')
		let urlLocalDevice = getLocalRestSystemConfigEndpoint()

		let options = {
			url: urlLocalDevice,
			headers: syncthingConfig.headers,
			method: 'POST',
			body: JSON.stringify(deviceConfig)
		}

		return request(options, (error, response, body) => {
			Resolve(body)
		}) 
	}) 
}

function attachLocalDeviceToMasterConfig(deviceConfig) {
	return new Promise((Resolve, Reject) => {
		let syncthingConfig = config.get('Syncthing.master')
		let urlMasterDevice = getMasterRestSystemConfigEndpoint()

		let options = {
			url: urlMasterDevice,
			headers: syncthingConfig.headers,
			method: 'POST',
			body: JSON.stringify(deviceConfig)
		}

		return request(options, (error, response, body) => {
			Resolve(body)
		}) 
	}) 
}
