'use strict'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import chaiSubset from 'chai-subset'
import nock from 'nock'
import AttachDevice from '../../src/attachDevice/AttachDevice.js'
import config from 'config'

chai.use(chaiAsPromised)
chai.use(chaiSubset)

let expect = chai.expect

describe('Attach Device (E2E)', () => {
	describe('when attach local device to master', () => {
		it('should attach locla device to master', () => {

			let masterEndpoint = config.get('Syncthing.masterEndpoint')
			let productionApiKey = config.get('Syncthing.master.headers.x-api-key')
			let localApiKey = config.get('Syncthing.node.headers.x-api-key')
			return expect(AttachDevice({
				masterEndpoint: masterEndpoint,
				production: productionApiKey,
				local: localApiKey
			})).to.eventually.deep.equal('{"version":26,"folders":[{"id":"default","label":"Default Folder","filesystemType":"basic","path":"/home/syncthing/Sync/","type":"readwrite","devices":[{"deviceID":"KNFFGTS-HRCZURY-5LMJR4R-7CPTJFL-PFYRSNJ-ECZO7O7-OXKUMSN-C2EP6QQ","introducedBy":""},{"deviceID":"OXXVLKN-CGFDGQC-R6B5U3S-KLVDVH2-ZOVGX6K-ZDBSDVH-Q2LG255-C4TWHQX","introducedBy":""},{"deviceID":"PEZKJS5-WI6EGEL-AMVIYJT-L3TKPH7-IYYD6EA-YJLIYZB-CC2BXMK-JO465QD","introducedBy":""}],"rescanIntervalS":60,"fsWatcherEnabled":false,"fsWatcherDelayS":10,"ignorePerms":false,"autoNormalize":true,"minDiskFree":{"value":1,"unit":"%"},"versioning":{"type":"","params":{}},"copiers":0,"pullers":0,"hashers":0,"order":"random","ignoreDelete":false,"scanProgressIntervalS":0,"pullerPauseS":0,"maxConflicts":-1,"disableSparseFiles":false,"disableTempIndexes":false,"paused":false,"weakHashThresholdPct":25,"markerName":".stfolder"}],"devices":[{"deviceID":"KNFFGTS-HRCZURY-5LMJR4R-7CPTJFL-PFYRSNJ-ECZO7O7-OXKUMSN-C2EP6QQ","name":"rancher-test2","addresses":["dynamic"],"compression":"metadata","certName":"","introducer":true,"skipIntroductionRemovals":false,"introducedBy":"","paused":false,"allowedNetworks":[],"autoAcceptFolders":false},{"deviceID":"OXXVLKN-CGFDGQC-R6B5U3S-KLVDVH2-ZOVGX6K-ZDBSDVH-Q2LG255-C4TWHQX","name":"c8f02d9f04e5","addresses":["dynamic"],"compression":"metadata","certName":"","introducer":true,"skipIntroductionRemovals":false,"introducedBy":"","paused":false,"allowedNetworks":[],"autoAcceptFolders":false},{"deviceID":"PEZKJS5-WI6EGEL-AMVIYJT-L3TKPH7-IYYD6EA-YJLIYZB-CC2BXMK-JO465QD","name":"1b054192d1ce","addresses":["dynamic"],"compression":"metadata","certName":"","introducer":false,"skipIntroductionRemovals":false,"introducedBy":"","paused":false,"allowedNetworks":[],"autoAcceptFolders":false}],"gui":{"enabled":true,"address":"0.0.0.0:8384","user":"","password":"","useTLS":false,"apiKey":"WmXVbRXhM4zQkyFz63o3vXQpk6FFs69R1","insecureAdminAccess":false,"theme":"default","debugging":false,"insecureSkipHostcheck":false,"insecureAllowFrameLoading":false},"options":{"listenAddresses":["default"],"globalAnnounceServers":["default"],"globalAnnounceEnabled":true,"localAnnounceEnabled":true,"localAnnouncePort":21027,"localAnnounceMCAddr":"[ff12::8384]:21027","maxSendKbps":0,"maxRecvKbps":0,"reconnectionIntervalS":60,"relaysEnabled":true,"relayReconnectIntervalM":10,"startBrowser":true,"natEnabled":true,"natLeaseMinutes":60,"natRenewalMinutes":30,"natTimeoutSeconds":10,"urAccepted":3,"urSeen":3,"urUniqueId":"EkkdaRG7","urURL":"https://data.syncthing.net/newdata","urPostInsecurely":false,"urInitialDelayS":1800,"restartOnWakeup":true,"autoUpgradeIntervalH":12,"upgradeToPreReleases":false,"keepTemporariesH":24,"cacheIgnoredFiles":false,"progressUpdateIntervalS":5,"limitBandwidthInLan":false,"minHomeDiskFree":{"value":1,"unit":"%"},"releasesURL":"https://upgrades.syncthing.net/meta.json","alwaysLocalNets":[],"overwriteRemoteDeviceNamesOnConnect":false,"tempIndexMinBlocks":10,"unackedNotificationIDs":[],"trafficClass":0,"weakHashSelectionMethod":"auto","stunServers":["default"],"stunKeepaliveSeconds":24,"kcpNoDelay":false,"kcpUpdateIntervalMs":25,"kcpFastResend":false,"kcpCongestionControl":true,"kcpSendWindowSize":128,"kcpReceiveWindowSize":128,"defaultFolderPath":"~"},"ignoredDevices":[],"ignoredFolders":[]}')
		})
	})
})
