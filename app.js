var app = angular.module('App', ['ui.bootstrap', 'ui.select']);

app.factory("notification", function() {
    var notification = {};
    notification.data = [{
            title: "Viveka Health Notification",
            description: "Notification testing",
            member_status: 0,
            posted_by: "user",
            posted_date: "2010-02-12",
            editable: false
        },
        {
            title: "Notification testing",
            description: "this is notification testing",
            member_status: 0,
            posted_by: "ram",
            posted_date: "2020-02-12",
            editable: false
        }
    ];
    return notification;
});

app.controller('CrudCtrl',
    function($scope, notification) {
        $scope.Profiles = notification.data;

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

        $scope.SortColumn = "title";
    }
);

app.controller('ModalDemoCtrl', function($uibModal, $log, $document, notification) {
    var $ctrl = this;
    // $types.type = ['Information', 'Reminders', 'Document Requested'];
    $ctrl.items = notification.data;
    console.log($document);
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