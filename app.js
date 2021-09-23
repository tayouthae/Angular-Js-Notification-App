var app = angular.module('App', ['ui.bootstrap']);

app.controller('CrudCtrl', ['$scope',
    function($scope) {
        $scope.Profiles = [{
                title: "Viveka Health Notification",
                description: "Notification testing",
                member_status: 0,
                posted_by: "user",
                posted_date: "2020-02-12",
                editable: false
            },
            {
                title: "Notification testing",
                description: "this is notification testing",
                member_status: 0,
                posted_by: "user",
                posted_date: "2020-02-12",
                editable: false
            }
        ];

        $scope.entity = {}

        $scope.edit = function(index) {
            $scope.entity = $scope.Profiles[index];
            $scope.entity.index = index;
            $scope.entity.editable = true;
        }

        $scope.delete = function(index) {
            $scope.Profiles.splice(index, 1);
        }

        $scope.save = function(index) {
            $scope.Profiles[index].editable = false;

        }

        $scope.add = function() {
            $scope.Profiles.push({
                title: "",
                description: "",
                member_status: "",
                posted_by: "",
                posted_date: "",
                editable: true
            })
        }
    }
]);

app.controller('ModalDemoCtrl', function($uibModal, $log, $document) {
    var $ctrl = this;
    $ctrl.items = ['item1', 'item2', 'item3'];

    $ctrl.animationsEnabled = true;

    $ctrl.open = function(size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function() {
                    return $ctrl.items;
                }
            }
        });

        modalInstance.result.then(function(selectedItem) {
            $ctrl.selected = selectedItem;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $ctrl.openComponentModal = function() {
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            component: 'modalComponent',
            resolve: {
                items: function() {
                    return $ctrl.items;
                }
            }
        });

        modalInstance.result.then(function(selectedItem) {
            $ctrl.selected = selectedItem;
        }, function() {
            $log.info('modal-component dismissed at: ' + new Date());
        });
    };

    $ctrl.openMultipleModals = function() {
        $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title-bottom',
            ariaDescribedBy: 'modal-body-bottom',
            templateUrl: 'stackedModal.html',
            size: 'sm',
            controller: function($scope) {
                $scope.name = 'bottom';
            }
        });

        $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'stackedModal.html',
            size: 'sm',
            controller: function($scope) {
                $scope.name = 'top';
            }
        });
    };

    $ctrl.toggleAnimation = function() {
        $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
    };
});

app.controller('ModalInstanceCtrl', function($uibModalInstance, items) {
    var $ctrl = this;
    $ctrl.items = items;
    $ctrl.selected = {
        item: $ctrl.items[0]
    };

    $ctrl.ok = function() {
        $uibModalInstance.close($ctrl.selected.item);
    };

    $ctrl.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});