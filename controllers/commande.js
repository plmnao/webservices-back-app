'use strict'

const Models = require('../models')
const CommandeModel = Models.commande
const CommandeProduitModel = Models.commande_produit
const ProduitModel = Models.produit
const lib = require('../lib')

class Ville {
  async getUserOrders(req, h) {
    try {
      const orders = await CommandeModel.findAll({
        where: { id_client: req.params.clientId },
        raw: true
      })

      for (const order of orders) {
        const products = await CommandeProduitModel.findAll({
          where: { id_commande: order.id_commande },
          raw: true
        })

        // Add total order price
        order.nombre_produits = products.length
        order.total = lib.getOrderTotalPrice(products)
      }

      return {
        code: 200,
        data: orders
      }
    } catch (error) {
      return lib.formatErrorResponse(500, error)
    }
  }

  async getOrder(req, h) {
    try {
      const order = await CommandeModel.findOne({
        where: { id_commande: req.params.id },
        raw: true
      })

      if (!order) {
        return lib.formatErrorResponse(
          404,
          `La commande ayant l'identifiant ${req.params.id} est introuvable`,
          true
        )
      }

      // Get list of order products
      const orderProducts = await CommandeProduitModel.findAll({
        where: { id_commande: order.id_commande },
        raw: true
      })

      // Find each order products and add them to order products list
      order.produits = []
      for (const orderProduct of orderProducts) {
        const product = await ProduitModel.findOne({
          where: { id_produit: orderProduct.id_produit },
          raw: true
        })
        if (product) {
          product.total_avec_remise =
            orderProduct.prix_unitaire * orderProduct.quantite
          product.total = lib.getOrderProductTotalPrice(orderProduct)
          product.quantite = orderProduct.quantite
          product.taux_remise = orderProduct.taux_remise
          order.produits.push(product)
        }
      }

      // Get order total price
      order.total = lib.getOrderTotalPrice(orderProducts)

      return {
        code: 200,
        data: order
      }
    } catch (error) {
      return lib.formatErrorResponse(500, error)
    }
  }
}

module.exports = new Ville()